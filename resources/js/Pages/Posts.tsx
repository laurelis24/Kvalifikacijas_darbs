import { Link } from '@inertiajs/react';
import React from 'react'
import { router } from "@inertiajs/react";

interface Post{
    id: number;
    category_id: number;
    title:string,
    description:string;
    coordinates: {latitude: number, longitude: number};
    created_at: string;
    updated_at: string; 
}



interface Messages{
    welcome: string;
    login:string;
    register:string;
    auth: {user: number, name:string, email:string}
    posts: Post[]
}

interface PaginatedLinks {
  active: boolean;
  label: string;
  url: string;
}

interface Paginated<T>{
  data: T[]
  current_page: number;
  last_page: number;
  links: PaginatedLinks[]
}

interface Props {
    posts: Paginated<Post>
}

export default function Posts(props:Messages) {
  
  return (
    <div>
      <h1>{props.register}</h1>

      <Link href='/dashboard'>Go to dashboard</Link>




      <select onChange={(e) => router.visit(`lang/${e.target.value}`) } name="" id="">
      <option value="">--Please choose an option-- </option>
      <option value="lv">LV</option>
     <option value="en">EN</option>

      </select>
    </div>
  )
}
