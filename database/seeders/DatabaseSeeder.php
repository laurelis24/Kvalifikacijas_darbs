<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use App\Models\Role;
use App\Models\User;
use App\Roles;
use Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $roles = Roles::all();
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $admin = User::create([
            'name' => env('ADMIN_NAME'),
            'username' => env('ADMIN_USERNAME'),
            'email' => env('ADMIN_EMAIL'),
            'password' => Hash::make(env('ADMIN_PASSWORD')),
        ]);

        $admin->roles()->attach(Role::where('name', Roles::USER)->first()->id);
        $admin->roles()->attach(Role::where('name', Roles::ADMIN)->first()->id);

        PostCategory::create([
            'title' => 'Negadījums',
            'description' => 'Situācija, kurā noticis ceļu satiksmes negadījums, kritiens vai cits negaidīts incidents, kas var apdraudēt cilvēku drošību vai traucēt apkārtējo vidi.',
            'color' => '#FF0000',
        ]);
        PostCategory::create([
            'title' => 'Vētras postījumi',
            'description' => 'Dabas stihiju radīti bojājumi, piemēram, nolauzti koki, applūdušas teritorijas vai sabojāta infrastruktūra, kas var apdraudēt apkārtējo vidi un satiksmi.',
            'color' => '#ffd700',
        ]);
        PostCategory::create([
            'title' => 'Pārkāpums',
            'description' => 'Situācijas, kurās tiek pārkāpti noteikumi vai likumi, piemēram, nelikumīga stāvēšana, trokšņošana, sabiedriskā kārtība vai citas darbības, kas traucē apkārtējo vidi un cilvēku drošību.',
            'color' => '#4f4d4d',
        ]);

        PostCategory::create([
            'title' => 'Dzīvnieku migrācija',
            'description' => 'Savvaļas dzīvnieku novērojumi vai kustība, piemēram, migrējošu dzīvnieku parādīšanās noteiktā teritorijā vai dzīvnieku ceļojumu ceļu atzīmēšana.',
            'color' => '#0b7309',
        ]);
        PostCategory::create([
            'title' => 'Lidojošie objekti un dabas parādības',
            'description' => 'Kategorija attiecas uz novērojumiem par objektiem, kas pārvietojas debesīs vai uz dabas parādībām, kas var ietvert meteorus, komētas, ziemeļblāzmas, neredzētus lidojošus objektus, cilvēku radītus lidojošus objektus un citus neparastus novērojumus',
            'color' => '#1e90ff',
        ]);

        PostCategory::create([
            'title' => 'Cits',
            'description' => 'Kategorija tiek izmantota gadījumos, kad novērojumi vai notikumi neiederas nevienā no iepriekšējām kategorijām, un tos nevar klasificēt zem jebkura specifiska nosaukuma.',
            'color' => '#a9a9a9',
        ]);
    }
}
