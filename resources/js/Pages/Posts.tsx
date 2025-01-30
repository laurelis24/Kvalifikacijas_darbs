import { Link } from '@inertiajs/react';
import React from 'react'

interface Post{
    id: number;
    category_id: number;
    title:string,
    description:string;
    coordinates: {latitude: number, longitude: number};
    created_at: string;
    updated_at: string; 
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

export default function Posts({posts}: Props) {
  return (
    <div>

       {posts.data.map(post => {
          

           return (
            <div key={post.id} className='border-2 p-5 m-2'>
              <h1 key={post.id}>{post.title}</h1>
              <div>{post.description}</div>
            </div>
              
           )
       })}


       {posts.links.map( link => {

            if (!link.active){
               return <Link key={link.label} href={`${link.url}`}>{link.label}</Link>
            }
       })}  
    </div>
  )
}
