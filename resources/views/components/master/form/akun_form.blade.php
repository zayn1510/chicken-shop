<style>
    .profile-container {
        margin: auto;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }

    .profile-header {
        position: relative;
        height: 200px;
        text-align: center;
    }

    .background-image {
        background-image: url('path/to/background_image.jpg');
        /* Ganti dengan URL gambar latar belakang */
        background-size: cover;
        background-position: center;
        height: 100%;
        filter: blur(5px);
        position: absolute;
        width: 100%;
        z-index: 1;
    }

    .profile-info {
        position: relative;
        z-index: 2;
        padding: 20px;
        color: white;
    }

    .profile-picture {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 4px solid #fff;
        margin-top: 20px;
    }

    h1 {
        margin: 10px 0 5px 0;
    }

    h3 {
        margin: 0;
        font-weight: normal;
    }

    .profile-details {
        padding: 20px;
    }

    h2 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #343a40;
    }

    .detail-item {
        margin: 15px 0;
    }

    label {
        font-weight: bold;
        color: #343a40;
        display: block;
    }

    input {
        width: 100%;
        padding: 12px;
        margin-top: 5px;
        border: 1px solid #ced4da;
        border-radius: 5px;
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none;
    }

    .save-button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 12px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s, transform 0.2s;
    }

    .save-button:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }
</style>
<div class="row">
    <div class="col-12 poppins">
        <input type="hidden" class="form-control" data-id="{{ Auth::user()->id }}" id="id_user"
            value="{{ Auth::user()->id }}"/>
        <div class="form-group">
        <div class="detail-item">
            <label for="name"> Nama Lengkap</label>
            <input type="text" id="name" name="name" value={{Auth::user()->name}} required>
        </div>
    </div>
    <div class="form-group">
        <div class="detail-item">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value={{Auth::user()->email}} required>
        </div>
    </div>
    <div class="form-group">
        <div class="detail-item">
            <label for="username">Nama Pengguna</label>
            <input type="text" id="username" name="username" value="{{Auth::user()->username}}" required>
        </div>
    </div>
    <div class="form-group">
        <div class="detail-item">
            <label for="old">Kata Sandi Lama</label>
            <input type="password" id="old" name="old" data-action="oldpassword"  required>
        </div>
    </div>
    <div class="form-group">
        <div class="detail-item">
            <label for="password">Kata Sandi Baru</label>
            <input type="password" id="password" name="password" required>
        </div>
    </div>
    <div class="form-group">
        <div class="detail-item">
            <button class="btn btn-primary " data-action="perbarui-akun">Perbarui Akun</button>
        </div>
    </div>
</div>
</div>
