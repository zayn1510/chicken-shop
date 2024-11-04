<?php

use Carbon\Carbon;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="{{ asset('dist/css/print.css') }}" media="screen, print" />
    <title>{{ $data['title'] }}</title>
</head>
<style>
</style>

<body>
    <table width="100%">
        <tr>
            <td width="10%" align="left"><img src="{{ $data["website"]->urlimage }}" alt="Fresh Chicken" class="hero-image"></td>
            <td width="100%" align="center">
                <h3>LAPORAN STOK MASUK<br><br>FARID BOWLIER</h3>
                <h3>Periode: <strong>{{ $data['periode'] }}</strong></h3>
            </td>
            <td width="10%" align="right"></td>
        </tr>
    </table>
    <hr>

    <div class="border-laporan">

    </div>
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Ayam</th>
                <th>Jumlah</th>
                <th>Jenis</th>
                <th>Tanggal</th>
            </tr>

        </thead>
        <tbody>
            <?php $no = 1; ?>
            @foreach ($data['laporan'] as $row)
                <?php $date = Carbon::parse($row->tanggal_masuk);
                $formattedDate = $date->translatedFormat('d F Y');
                $jenis_stok = $row->jenis_stok == 1 ? ' Stok Masuk' : 'Stok Keluar';
                ?>
                <tr class="text-center">
                    <td>{{ $no++ }}</td>
                    <td>{{ $row->jenis }}</td>
                    <td>{{ $row->jumlah }}</td>
                    <td>{{ $jenis_stok }}</td>
                    <td>{{ $formattedDate }}</td>

                </tr>
            @endforeach
        </tbody>
    </table>
    {{-- <div class="container">
        <div class="row">
            <div class="kotak-ttd">
                <p>Setujui Oleh</p>
                <p><b>Kepala Desa</b></p>
                <p class="space"></p>
                <p><b>{{ $data->perangkat['nama_kepala_desa'] }}</b></p>
            </div>
        </div>
        <div class="row">
            <div class="kotak-ttd">
                <p>Setujui Oleh</p>
                <p><b>Sekretaris Desa</b></p>
                <p class="space"></p>
                <p><b>{{ $data->perangkat['nama_sekretaris_desa'] }}</b></p>
            </div>

        </div>
    </div> --}}
    <script>
        window.print();

        window.addEventListener('afterprint', function() {
            window.history.back();
        });
    </script>
</body>

</html>
