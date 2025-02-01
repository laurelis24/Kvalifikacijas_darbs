import { Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react'
import { router } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';


interface Post{
    id: number;
    category_id: number;
    title:string,
    description:string;
    coordinates: {latitude: number, longitude: number};
    created_at: string;
    updated_at: string; 
}

interface Category{
  id: number;
  title:string;
  description:string;
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

interface Test{
  accept: string;
  placeHolder: string;
}

interface Props {
    posts: Test
    categories: Category[]
}

export default function Posts(props:Props) {
  console.log(props);
   const { data, setData, post, processing, errors, reset } = useForm({
        titleLv: '',
        titleEng: '',
        descriptionLv: '',
        descriptionEng: ''
      });


  const submit: FormEventHandler = e => {
       e.preventDefault();
       post(route("test"), {onFinish: () => {
          //reset('test')
       }})

       
    //console.log('submited')
  }
  
  return (
    <div>
    

      <Link href='/dashboard'>Go to dashboard</Link>




      <select onChange={(e) => router.visit(`lang/${e.target.value}`) } name="" id="">
      <option value="">{props.posts.placeHolder}</option>
      <option value="lv">LV</option>
     <option value="en">EN</option>

      </select>

      <form onSubmit={submit}>
    <TextInput
          id="test"
          type="text"
          name="text"
          value={data.titleLv}
          className="mt-1 block w-full"
          autoComplete="tersrt"
          isFocused={true}
          onChange={(e) => setData('titleLv', e.target.value)}
      />
    <TextInput
          id="test"
          type="text"
          name="text"
          value={data.titleEng}
          className="mt-1 block w-full"
          autoComplete="tersrt"
          isFocused={true}
          onChange={(e) => setData('titleEng', e.target.value)}
      />
    <TextInput
          id="test"
          type="text"
          name="text"
          value={data.descriptionLv}
          className="mt-1 block w-full"
          autoComplete="tersrt"
          isFocused={true}
          onChange={(e) => setData('descriptionLv', e.target.value)}
      />
    <TextInput
          id="test"
          type="text"
          name="text"
          value={data.descriptionEng}
          className="mt-1 block w-full"
          autoComplete="tersrt"
          isFocused={true}
          onChange={(e) => setData('descriptionEng', e.target.value)}
      />
      <button type='submit'>Accept</button>
      </form>



      {props.categories.map(category => {
          return <h1 key={category.id}>{category.title}</h1>
      })}
    </div>
  )
}
