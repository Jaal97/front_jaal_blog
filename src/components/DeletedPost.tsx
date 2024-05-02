import React,{useEffect} from 'react'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

const DeletedPost = (props: any) => {

    const idPost = props.id;
    const { data: session } = useSession();
    const token = session?.user?.token;

    const urlPost = `${process.env.NEXT_PUBLIC_API_URL}/posts/${idPost}`;
    const router = useRouter();

    useEffect(() => {
        fetch(urlPost, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })

        router.push('/');
        
    }, [idPost, token])



    return (
        <div></div>
    )
}

export default DeletedPost