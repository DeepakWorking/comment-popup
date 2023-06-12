import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import Chip from "@mui/joy/Chip";
import styles from "./Comments.module.css";
import { useRef, useEffect } from "react";
import { getFormattedDate, getNameInitials } from "../utils";

const Comments = ({ commentList }) => {
  const commentListRef = useRef();
  useEffect(() => {
    if (commentListRef?.current) {
      const element = commentListRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [commentList]);
  const getTaggedDom = (tags = []) => {
    if (!tags.length) return null;
    return (
      <div className={styles.taggedItems}>
        {tags.map((tagName) => (
          <Chip variant="soft" className={styles.chip}>
            {tagName}
          </Chip>
        ))}
      </div>
    );
  };
  const createCommentDom = (comment) => {
    return (
      <ListItem className={styles.commentListItem}>
        <ListItemDecorator>
          <Avatar>{getNameInitials(comment?.updatedBy)}</Avatar>
        </ListItemDecorator>
        <ListItemContent>
          <Typography variant="body2">{comment?.updatedBy}</Typography>
          <Typography>{comment?.comment}</Typography>
          {getTaggedDom(comment.taggedTo)}
          <Typography variant="body2" fontSize={"small"}>
            {getFormattedDate(comment?.updatedOn)}
          </Typography>
        </ListItemContent>
      </ListItem>
    );
  };
  const createCommentListDom = () => {
    return (
      <List
        sx={{ "--ListItemDecorator-size": "56px" }}
        className={styles.commentListWrapper}
        ref={commentListRef}
      >
        {commentList.map((comment) => createCommentDom(comment))}
      </List>
    );
  };
  if (commentList.length === 0)
    return <Typography>No Comments Added!</Typography>;
  return <>{createCommentListDom()}</>;
};

export default Comments;
