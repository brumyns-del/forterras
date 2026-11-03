(function () {
    "use strict";

    const donateBtn = document.getElementById('donateButton');
    const modal = document.getElementById('donateModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const toast = document.getElementById('toast');
    const options = document.querySelectorAll('.donate-option');

    let toastTimer = null;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove('show');
        }, 2500);
    }

    if (donateBtn && modal && closeBtn) {
        function openModal() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        donateBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        options.forEach(function (option) {
            option.addEventListener('click', function () {
                const value = this.getAttribute('data-value');
                const type = this.getAttribute('data-type');
                let label = (type === 'phone') ? 'Номер телефона' : 'Номер карты';

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(value).then(function () {
                        showToast('✅ Скопировано: ' + value);
                    }).catch(function () {
                        copyFallback(value, label);
                    });
                } else {
                    copyFallback(value, label);
                }
            });
        });

        function copyFallback(text, label) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            textarea.style.top = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showToast('✅ Скопировано: ' + text);
            } catch (err) {
                showToast('Попробуйте вручную: ' + text);
            }
            document.body.removeChild(textarea);
        }
    }

    var checklistContainer = document.getElementById('checklistContent');
    var showChecklistBtn = document.getElementById('showChecklistBtn');
    var checklistVisible = false;

    if (showChecklistBtn && checklistContainer) {
        showChecklistBtn.addEventListener('click', function () {
            if (checklistVisible) {
                checklistContainer.classList.add('checklist-hidden');
                showChecklistBtn.innerHTML = '📋 Чек-лист на неделю';
                checklistVisible = false;
            } else {
                checklistContainer.classList.remove('checklist-hidden');
                showChecklistBtn.innerHTML = '✖️ Скрыть чек-лист';
                checklistVisible = true;
                setTimeout(function () {
                    checklistContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }

    var downloadPdfBtn = document.getElementById('downloadPdfBtn');

    if (downloadPdfBtn && checklistContainer) {
        downloadPdfBtn.addEventListener('click', function () {
            var wasHidden = checklistContainer.classList.contains('checklist-hidden');
            if (wasHidden) {
                checklistContainer.classList.remove('checklist-hidden');
            }

            var element = document.getElementById('checklistContent');
            var btn = this;
            var originalText = btn.innerText;
            btn.innerText = '⏳ Генерация PDF...';
            btn.disabled = true;

            html2canvas(element, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: false
            }).then(function (canvas) {
                var imgData = canvas.toDataURL('image/png');
                var { jsPDF } = window.jspdf;
                var pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });
                var imgWidth = 210;
                var pageHeight = 297;
                var imgHeight = (canvas.height * imgWidth) / canvas.width;
                var position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                if (imgHeight > pageHeight) {
                    var heightLeft = imgHeight - pageHeight;
                    position = -pageHeight;
                    while (heightLeft > 0) {
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                        position -= pageHeight;
                    }
                }
                pdf.save('living_table_checklist.pdf');
                btn.innerText = originalText;
                btn.disabled = false;

                if (wasHidden) {
                    checklistContainer.classList.add('checklist-hidden');
                }
            }).catch(function (error) {
                console.error('Ошибка:', error);
                btn.innerText = '❌ Ошибка';
                setTimeout(function () {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 2000);
                if (wasHidden) {
                    checklistContainer.classList.add('checklist-hidden');
                }
            });
        });
    }
})();