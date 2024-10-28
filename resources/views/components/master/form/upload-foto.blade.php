<div class="upload-container">
    <div class="upload-box" id="uploadBox">
        <input class="file-input" type="file" id="fileInput" data-action ="openfile" accept="image/*">
        <div class="upload-instructions" id="uploadInstructions">
            <i class="fas fa-cloud-upload-alt"></i>
            <h4>Drag & Drop to Upload Image</h4>
            <p>or click to browse</p>
        </div>
    </div>
    <div class="image-preview" id="imagePreview" style="display:none;">
        <img id="uploadedImage" src="#" alt="Preview Image">
        <button class="remove-btn btn-block" data-action="removeupload">Hapus</button>
    </div>
</div>
