"use client";
import { postsApi } from "@/api";
import { useAuthStore } from "@/api/authStore";
import IconButton from "@/components/IconButton";
import Modal from "@/components/Modal";
import Notification from "@/components/Notification";
import { PostItemType } from "@/components/PostCard";
import useNotification from "@/helpers/useNotification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface IProps {
  post: PostItemType;
}

const DeletePost = ({ post }: IProps) => {
  const router = useRouter();
  const { me } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notification, showNotification } = useNotification();

  const onDelete = async () => {
    const res = await postsApi.delete(post.id);
    setIsModalOpen(false);
    if (res?.error) {
      showNotification(res.error.message, "error");
    } else {
      router.push("/posts");
      router.refresh();
    }
  };

  return (
    <>
      {me?.id === post?.user?.id && (
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

          <IconButton
            onClick={() => setIsModalOpen(true)}
            icon={MdDeleteOutline}
            signature="Delete this post"
          />
        </>
      )}
    </>
  );
};

export default DeletePost;
