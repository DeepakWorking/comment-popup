import ListItem from "@mui/joy/ListItem";
import Button from "@mui/joy/Button";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/joy/Checkbox";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";
import { useEffect, useState } from "react";
import List from "@mui/joy/List";
import IconButton from "@mui/joy/IconButton";
import styles from "./UserListSelector.module.css";
import { Clear } from "@mui/icons-material";

export default function SelectIndicator({ users, onChange, taggedUsers }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState(taggedUsers);
  const handleToggle = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };
  useEffect(() => {
    window.addEventListener("click", () => {
      setShowOptions(false);
    });
    return () => {
      window.removeEventListener("click", () => {
        setShowOptions(false);
      });
    };
  }, []);
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(selectedValue);
    }
  }, [selectedValue]);
  useEffect(() => {
    setSelectedValue(taggedUsers);
  }, [taggedUsers]);
  const handleChange = (user, isChecked) => {
    if (isChecked) {
      setSelectedValue((selectedValue) => [...selectedValue, user]);
    } else {
      clearFromSelection(user);
    }
  };
  const clearFromSelection = (user) => {
    setSelectedValue((selectedValue) =>
      selectedValue.filter((item) => user !== item)
    );
  };
  const renderSelectedValue = () => {
    if (setSelectedValue.length === 0) return null;
    return (
      <Stack direction="row" className={styles.selectTagItems} gap={"10px"}>
        {selectedValue.map((val) => (
          <Chip className={styles.chip} variant="soft">
            <div className={styles.chipItemWrapper}>
              <span>{val}</span>
              <IconButton
                variant="string"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFromSelection(val);
                }}
              >
                <Clear size="small" className={styles.clearIcon} />
              </IconButton>
            </div>
          </Chip>
        ))}
      </Stack>
    );
  };

  return (
    <div className={styles.selectWrapper}>
      <Button
        startDecorator={
          <Typography className={styles.selectTagTypgraphy}>Tag To:</Typography>
        }
        endDecorator={
          <KeyboardArrowDown className={styles.selectArrowIndicator} />
        }
        variant="outlined"
        sx={{ width: "100%" }}
        className={styles.selectButton}
        onClick={handleToggle}
      >
        {renderSelectedValue()}
      </Button>
      {showOptions && (
        <List
          onClick={(e) => e.stopPropagation()}
          className={styles.selectOptionsWrapper}
        >
          {users.map((user) => {
            return (
              <ListItem className={styles.selectItem}>
                <Checkbox
                  checked={selectedValue.includes(user)}
                  onChange={(e) => handleChange(user, e.target.checked)}
                />
                <Typography>{user}</Typography>
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
}
