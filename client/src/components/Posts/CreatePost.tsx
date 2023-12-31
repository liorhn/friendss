import React, { useState } from "react";
import { Stack, Button, TextField } from "@mui/material";
import axios from "axios";
import { config } from "../../config/config";

export const CreatePost = ({ onCreate }: any) => {
  const [postContent, setPostContent] = useState("");

  const handlerSubmitPost = () => {
    axios
      .post(
        `${config.apiBase}/v1/posts`,
        { postContent },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        axios
          .get(`${config.apiBase}/v1/posts`, {
            withCredentials: true,
          })
          .then((response) => {
            const newPost = response.data.result;
            const lastNewPost = newPost[newPost.length - 1];
            onCreate(lastNewPost);
          })

          .catch((error) => {
            console.error(error);
          });
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue="Write your post here..."
          inputProps={{
            style: {
              width: "600px",
              height: "100px",
            },
          }}
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        />
        <Button variant="outlined" onClick={handlerSubmitPost}>
          Submit Post
        </Button>
      </Stack>
    </>
  );
};
