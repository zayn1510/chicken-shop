<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       \App\Models\User::create([
        "username"=>"admin",
        "email"=>"admin@gmail.com",
        "password"=>Hash::make("12345678"),
        "name"=>"admin"
       ]);
    }
}
