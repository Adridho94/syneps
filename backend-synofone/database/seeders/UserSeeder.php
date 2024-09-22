<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // method querry buyilder
        // DB::table('users')->insert([
        //     'name'=>'admin syneps',
        //     'email'=>'admin@admin.com',
        //     'password'=>bcrypt('admin123')
        // ]);

        // method php native
        $user = new User;
        $user->name = 'admin syneps';
        $user->email = 'admin@admin.com';
        $user->role = 1;
        $user->password = bcrypt('admin123');
        $user->save();

        User::factory(10)->create();

        // method eloquent
        // User::create([
        //     'name'=>'admin syneps',
        //     'email'=>'admin@admin.com',
        //     'password'=>bcrypt('admin123')
        // ]);

    }
}
