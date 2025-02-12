import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreatePostForm from './Profile/Partials/CreatePostForm';
import {PageProps, Translation } from '../types/index';
import { useState } from 'react';
import { LatLng} from 'leaflet';
import Map from './Map';
import LocationMarker from '@/Components/LocationMarker';





export default function CreatePost(props:PageProps) {
   
     
    return <AuthenticatedLayout>
     <CreatePostForm create_post_page={props.translations.create_post_page}/>
    </AuthenticatedLayout>;
}
