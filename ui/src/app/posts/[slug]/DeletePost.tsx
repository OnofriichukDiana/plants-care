"use client";
import { postsApi } from "@/api";
import { useAuthStore } from "@/api/authStore";
import LoadingButton from "@/components/LoadingButton";
import Modal from "@/components/Modal";
import Notification from "@/components/Notification";
import { IPost } from "@/components/postCard";
import useNotification from "@/hooks/useNotification";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface IProps {
  post: IPost;
}

const DeletePost = ({ post }: IProps) => {
  const router = useRouter();
  const { me } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { notification, showNotification } = useNotification();

  useEffect(() => {
    if (me?.id === post?.user?.id) {
      setIsAuth(true);
    }
  }, [post?.user?.id, me?.id]);

  const onDelete = async () => {
    setIsLoading(true);
    const res = await postsApi.delete(post.id);
    setIsModalOpen(false);
    if (res?.error) {
      showNotification(res.error.message, "error");
    } else {
      router.push("/posts");
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <>
      {isAuth && (
        <>
          {notification && <Notification message={notification.message} />}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p className="body1">Are you sure you want to delete this post?</p>
            <div className="flex mt-3 justify-between">
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                style={{ background: "rgb(239 68 68)" }}
                type="button"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </Modal>

          <LoadingButton
            button={
              <button
                type="button"
                className="icon-button"
                onClick={() => setIsModalOpen(true)}
              >
                <MdDeleteOutline size={20} style={{ color: "grey" }} />
              </button>
            }
            isLoading={isLoading}
            size={6}
          />
        </>
      )}
    </>
  );
};

export default DeletePost;
