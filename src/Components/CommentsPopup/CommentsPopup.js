import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Clear from "@mui/icons-material/Clear";
import Comments from "../Comments/Comments";
import { useEffect, useState, useRef } from "react";
import SaveComment from "../SaveComment/SaveComment";
import styles from "./CommentsPopup.module.css";

const LOGGEDINUSER = "Deepak Pandey";

const CommentPopup = ({ showPopup, closePopup }) => {
  const [comments, setComments] = useState([]);
  const commentRef = useRef(null);

  const fetchComments = async () => {
    const response = await fetch(
      "https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9"
    );
    const data = await response.json();
    setComments(data.comments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSaveComment = (comment) => {
    setComments((comments) => [...comments, comment]);
    if (commentRef?.current) {
      let commentSection = commentRef?.current;
      commentSection.scrollTo(commentSection.scrollHeight);
    }
  };

  return (
    <Modal open={showPopup} onClose={closePopup}>
      <ModalDialog
        variant="outlined"
        size="lg"
        className={styles.commentPopupWrapper}
      >
        <div className={styles.commentPopupHeader}>
          <Typography fontWeight="lg" className={styles.poppTitle}>
            Comments ({`${comments.length}`})
          </Typography>
          <div className={styles.rightHeader}>
            <Chip variant="soft" size="sm" className={styles.chip}>
              Loan Id - 1111893
            </Chip>
            <IconButton variant="string" size="small" onClick={closePopup}>
              <Clear size="small" className={styles.clearIcon} />
            </IconButton>
          </div>
        </div>
        <Comments commentList={comments} ref={commentRef} />
        <SaveComment
          onSaveClick={handleSaveComment}
          onCancelClick={closePopup}
          user={LOGGEDINUSER}
        />
      </ModalDialog>
    </Modal>
  );
};
export default CommentPopup;
