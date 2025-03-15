import { Input } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { createEditor} from "slate";
import { Editable, Slate } from "slate-react";


interface Props{
    post: {
      title:string;
      description:string;
    }

    images: Image[];
    comments: string[];
}
interface Image{
  id:number;
  file_path:string;
  media_type:string;
}


export default function PostShow({post, images, comments}: Props) {
  const editor = createEditor()
  const user = usePage().props.auth.user;
  console.log(user);
   
  return (
    <div>
      <div>{post.title}</div>
      <Slate editor={editor} initialValue={JSON.parse(post.description)}>
          <Editable renderLeaf={props => <Leaf {...props} />} readOnly/> 
      </Slate>

      <div>
         {images && images.map((image, idx) => {
              return <img key={image.id} src={`../../storage/${image.file_path}`} alt={`Image-${idx}`} />
         })}
      </div>


      <div>
        {(user?.roles?.some(role => role === "admin" || role === "user" || role === "moderator")) && 
        <input type="text">
        </input>}
      </div>
    </div>
  )
}

/// TODO: Need to change location
interface LeafProps {
  attributes: { [key: string]: any };
  children: React.ReactNode;
  leaf: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      code?: boolean;
  };
}

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.bold) {
      children = <strong>{children}</strong>;
  }

  if (leaf.code) {
      children = <code>{children}</code>;
  }

  if (leaf.italic) {
      children = <em>{children}</em>;
  }

  if (leaf.underline) {
      children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};