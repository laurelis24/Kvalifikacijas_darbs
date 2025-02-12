<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Redirect;
use Session;

class LanguageController extends Controller
{
    public function switchLanguage(string $locale){

        if (in_array($locale, ['en', 'lv'])) {
            Session::put('locale', $locale);
        } else {
            Session::put('locale', 'lv');
        }   
    
        
         return Redirect::back();
    }
}
