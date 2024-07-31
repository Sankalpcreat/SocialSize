document.addEventListener('DOMContentLoaded', function() {
    const imageFileInput = document.getElementById('imageFile');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const resizeButton = document.getElementById('resizeButton');
    
    imageFileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    resizeButton.addEventListener('click', function() {
        const file = imageFileInput.files[0];
        if (!file) {
            alert('Please choose an image file first.');
            return;
        }

        const selectedButton = document.querySelector('.nav-btn.selected');
        if (!selectedButton) {
            alert('Please select at least one resize option.');
            return;
        }

        const resizeOption = selectedButton.id.replace('-btn', '');
        const dimensions = {
            facebook: { width: 1200, height: 630 },
            instagram: { width: 1080, height: 1080 },
            twitter: { width: 1024, height: 512 },
            linkedin: { width: 1200, height: 627 }
        };

        const { width, height } = dimensions[resizeOption];
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(function(blob) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${resizeOption}_resized.png`;
                    link.click();
                }, 'image/png');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});
