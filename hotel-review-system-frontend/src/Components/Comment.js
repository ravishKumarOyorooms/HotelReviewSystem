import React, { Component } from "react";
import {
  Paper,
  Grid,
  Divider,
  Avatar,
  Typography,
  TextField,
  Box,
  Button
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Axios from "axios";
import CommentModal from "./CommentModal";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Forum from "@material-ui/icons/Forum";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";

export default class Comment extends Component {
  state = {
    id: this.props.h_id,
    comments: [],
    text: "",
    open: false,
    cid: "",
    commentText: ""
  };

  dismissModal = () => {
    this.setState({ open: false });
  };
  OpenCommentModal = comment => {
    this.setState({ open: true, commentText: comment.text, cid: comment.id });
  };

  componentDidMount = async () => {
    const res = await Axios.get(
      `http://localhost:8080/hotels/${this.state.id}/comments`
    );

    this.setState({ comments: res.data });
  };

  EditComment = async data => {
    data["userId"] = sessionStorage.getItem("userId");
    data["username"] = sessionStorage.getItem("username");

    await Axios.post(
      `http://localhost:8080/hotels/${this.state.id}/comment`,
      data
    );
    this.dismissModal();
    this.setState({
      comments: this.state.comments.map(item => {
        if (data.id === item.id) return data;
        return item;
      })
    });
  };

  showComment = comment => {
    return (
      <React.Fragment>
        <Paper key={comment.id}>
          <List>
            <ListItem button>
              <Grid container>
                <Grid item xs={1}>
                  <Avatar></Avatar>
                  <small>{comment.username}</small>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <p>{comment.text}</p>
                </Grid>
                <Grid item xs={2}>
                  {sessionStorage.getItem("userId") &&
                    comment.userId == sessionStorage.getItem("userId") && (
                      <Button
                        visibility="hidden"
                        style={{ float: "right" }}
                        startIcon={<EditIcon />}
                        color="primary"
                        variant="contained"
                        onClick={() => this.OpenCommentModal(comment)}
                      >
                        {" "}
                        Edit
                      </Button>
                    )}
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Paper>
      </React.Fragment>
    );
  };

  formSubmit = async e => {
    e.preventDefault();
    if (this.state.text.length > 0) {
      const data = {
        userId: sessionStorage.getItem("userId"),
        username: sessionStorage.getItem("username"),
        text: this.state.text
      };

      const res = await Axios.post(
        `http://localhost:8080/hotels/${this.state.id}/comment`,
        data
      );

      this.setState({
        comments: [...this.state.comments, res.data],
        text: ""
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Grid
          container
          style={{
            width: "98%",
            backgroundColor: "#faebd7",
            margin: "2%"
          }}
        >
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" align="center">
                  <Forum fontSize="large" color="primary" /> Comments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          style={{
            width: "98%",
            border: "solid black 1px",
            borderRadius: "5px",
            margin: "2%",
            height: "auto",
            paddingTop:"10px"
          }}
        >
          {this.props.isLogin && (
            <>
              <Grid item xs={1}></Grid>

              <Grid item xs={8}>
                <TextField
                  fullWidth
                  margin="normal"
                  type="text"
                  name="text"
                  placeholder="Enter Comment Here"
                  value={this.state.text}
                  onChange={e => this.setState({ text: e.target.value })}
                >
                  {" "}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={{
                    float: "right",
                    marginTop: "auto",
                    marginBottom: "0%"
                  }}
                  startIcon={<SendIcon />}
                  color="secondary"
                  variant="contained"
                  onClick={this.formSubmit}
                >
                  {" "}
                  Submit
                </Button>
              </Grid>
            </>
          )}
          <Grid items xs={12}>
            {this.state.comments.map(comment => {
              return this.showComment(comment);
            })}

            {this.state.open && (
              <CommentModal
                open={this.state.open}
                dismissModal={this.dismissModal}
                text={this.state.commentText}
                EditComment={this.EditComment}
                cid={this.state.cid}
              />
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
