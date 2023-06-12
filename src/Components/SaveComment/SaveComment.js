import { useState, useRef } from "react";
import Textarea from "@mui/joy/Textarea";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import UserListSelector from "../UserListSelector/UserListSelector";
import styles from "./SaveComment.module.css";
import { getNameInitials } from "../utils";

const users = [
  "John Smith",
  "Emma Johnson",
  "Michael Davis",
  "Sophia Lee",
  "Benjamin Martinez",
];
const SaveComment = ({ onSaveClick, onCancelClick, user }) => {
  const [comment, setComment] = useState("");
  const [taggedUsers, setTaggedUsers] = useState([]);
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSave = () => {
    const commentObj = {
      comment,
      taggedTo: [...taggedUsers],
      updatedBy: user,
      updatedOn: new Date().toISOString(),
    };
    onSaveClick(commentObj);
    setComment("");
    setTaggedUsers([]);
  };
  const handleCancel = () => {
    onCancelClick();
  };
  const handleTaggedUsersChange = (users) => {
    setTaggedUsers(users);
  };
  return (
    <>
      <div className={styles.saveWrapper}>
        <Avatar className={styles.avatar}>{getNameInitials(user)}</Avatar>
        <div className={styles.saveCommentSection}>
          <Textarea
            name="Outlined"
            placeholder="Your Comment"
            variant="outlined"
            className={styles.commentSection}
            onChange={handleChange}
            value={comment}
          />
          <UserListSelector
            users={users}
            onChange={handleTaggedUsersChange}
            taggedUsers={taggedUsers}
            user
          />
          <div className={styles.buttonGroup}>
            <Button size="lg" disabled={!comment} onClick={handleSave}>
              Save
            </Button>
            <Button
              size="lg"
              variant="outlined"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveComment;
