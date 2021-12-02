import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { yellow, green, blue } from "@material-ui/core/colors";

const useStyle = makeStyles((theme) => {
  return {
    avatar: {
      background: (note) => {
        if (note.category === "work") return yellow[700];
        if (note.category === "reminders") return green[500];
        return blue[500];
      },
    },
  };
});

const NoteCard = ({ note, deleteHandler }) => {
  const classes = useStyle(note);

  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => deleteHandler(note.id)}
            >
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
