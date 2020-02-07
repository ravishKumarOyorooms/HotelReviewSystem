import React, { Component } from "react";
import Comment from "./Comment";
import RatingModal from "./RatingModal";
import Axios from "axios";
import {
  Button,
  Tooltip,
  Grid,
  Typography,
  Snackbar,
  Box
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Progress } from "react-sweet-progress";
import Icon from "@material-ui/core/Icon";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Alert from "@material-ui/lab/Alert";
import StarIcon from "@material-ui/icons/Star";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default class Hotel extends Component {
  state = {
    open: false,
    canReview: true,
    disabledAddReviewBtn: false,
    isLogin: false,
    hotel: {},
    snackOpen: false
  };

  componentDidMount = () => {
    this.getHotelInfo();
  };
  getHotelInfo = async () => {
    let userId = sessionStorage.getItem("userId");
    if (userId) this.setState({ isLogin: true });
    const hid = this.props.match.params.id;
    const data1 = await Axios.get(`http://localhost:8080/hotels/hotel/${hid}`);
    console.log(data1);
    this.setState({ hotel: data1.data });
    if (this.state.isLogin) {
      const res = await Axios.get(
        `http://localhost:8080/hotels/${hid}/${userId}`
      );
      this.setState({ canReview: res.data });
    } else this.setState({ canReview: false });
  };

  dismissModal = () => {
    this.setState({ open: false });
  };
  OpenRatingModal = () => {
    this.setState({ open: true });
  };
  snackClose = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ snackOpen: false });
  };
  onRatingModalSubmit = async data => {
    try {
      data["user_id"] = sessionStorage.getItem("userId");
      data["username"] = sessionStorage.getItem("username");
      const id = this.props.match.params.id;
      await Axios.post(`http://localhost:8080/hotels/${id}/ratings`, data);
      this.dismissModal();
      this.setState({ disabledAddReviewBtn: true });
      this.setState({ snackOpen: true });
      this.getHotelInfo();
    } catch (e) {
      alert("Rating Not allowed");
    }
  };

  render() {
    const hotel = this.state.hotel;
    console.log(hotel);
    //document.body.style.backgroundColor = "#fafafa";
    console.log(hotel.averageRating);
    return (
      <div className="MuiGrid-container">
        <Grid
          container
          style={{
            width: "100%",
            backgroundColor: "#fffff",
            border: "solid black 2px",
            borderRadius: "5px",
            margin: "2%"
          }}
        >
          <Grid item xs={12} md={5}>
            <img
              alt="hotel"
              src={hotel.image}
              style={{ height: "100%", width: "100%", backgroundSize: "cover" }}
            />
          </Grid>

          <Grid item xs={12} md={7} style={{ padding: "10px" }}>
            <div style={{ display: "inline-block", width: "100%" }}>
              <div style={{ display: "inline-block" }}>
                <Typography variant="h5">{hotel.name}</Typography>
                <Typography>
                  <LocationOnIcon style={{ display: "inline-block" }} />
                  <small>{hotel.location}</small>
                </Typography>
              </div>
              <Box style={{ display: "inline-block", float: "right" }}>
                <Typography variant="h6">
                  <Button style={{ background: "green", color: "white" }}>
                    {hotel.total_average_ratings}
                    <StarIcon fontSize="small" />
                  </Button>
                </Typography>
                <small style={{ display: "inline-block" }}>
                  {hotel.no} {hotel.no > "1" ? "Ratings" : "Rating"}
                </small>
              </Box>
            </div>

            {hotel.averageRating && (
              <div>
                <Grid container spacing={0.5}>
                  <Grid item xs={3}>
                    <Typography>Food:&nbsp; </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Progress percent={hotel.averageRating.avgFood * 20} />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
                <Grid container spacing={0.5}>
                  <Grid item xs={3}>
                    <Typography>Service:&nbsp; </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Progress percent={hotel.averageRating.avgService * 20} />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
                <Grid container spacing={0.5}>
                  <Grid item xs={3}>
                    <Typography>Locality:&nbsp; </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Progress percent={hotel.averageRating.avgLocality * 20} />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
                <Grid container spacing={0.5}>
                  <Grid item xs={3}>
                    <Typography>Cleanliness:&nbsp; </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Progress
                      percent={hotel.averageRating.avgCleanliness * 20}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
                <Grid container spacing={0.5}>
                  <Grid item xs={3}>
                    <Typography>Security:&nbsp; </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Progress percent={hotel.averageRating.avgSecurity * 20} />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
                <Grid container spacing={0.5}>
                  <Grid item xs={12} sm={3}>
                    <Typography>Value&nbsp;For&nbsp;Money:&nbsp; </Typography>
                  </Grid>
                  <Grid item xs={11} sm={8}>
                    <Progress
                      percent={hotel.averageRating.avgValueForMoney * 20}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
                <Grid container spacing={0.5}>
                  <Grid item xs={3}>
                    <Typography>Accessibility:&nbsp; </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Progress
                      percent={hotel.averageRating.avgAccessiblity * 20}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </div>
            )}
            <Grid container spacing={1} style={{ marginTop:"60px"}}>
              <Grid item >
                {this.state.canReview && (
                  <Button
                    startIcon={<AddBoxIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={this.OpenRatingModal}
                  >
                    Add Rating
                  </Button>
                )}
                {!this.state.canReview && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color:"green",
                    
                }}>
                <CheckCircleIcon fontSize="large"/>
                    <p style={{fontSize:"25px"}}>Rated</p>
                </div>  
                  
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.open && (
          <RatingModal
            open={this.state.open}
            dismissModal={this.dismissModal}
            onRatingModalSubmit={this.onRatingModalSubmit}
          />
        )}
        <div className="CommentInfo MuiGrid-container">
          <Comment
            h_id={this.props.match.params.id}
            isLogin={this.state.isLogin}
          />
        </div>

        <Snackbar
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.snackClose}
          TransitionComponent="SlideTransition"
        >
          <Alert onClose={this.snackClose} severity="success">
            Rating Submitted
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
