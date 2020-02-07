import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import PoolIcon from "@material-ui/icons/Pool";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import BathtubIcon from "@material-ui/icons/Bathtub";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import RatingToolTip from "./RatingToolTip";
import Tooltip from "@material-ui/core/Tooltip";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { Link, Redirect, withRouter } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

 class HotelList extends Component {
  state = {
    hotels: [],
    pg_no: 0,
    flag: "",
    searchText: ""
  };

  componentDidMount() {
    this.loadHotels();
  }

  loadHotels = async () => {
    const res = await Axios.get(
      `http://localhost:8080/hotels/${this.state.pg_no}`
    );
    this.setState({ pg_no: res.data[0] });
    this.setState({ hotels: res.data[1] });
  };

  handleChange = e => {
    this.setState({ flag: e.target.value });
  };

  onSearchSubmit= ()=>{
    console.log("submitted");
    const {flag}=this.state;
    const {searchText}=this.state;
     if(flag.length>0&&searchText.length>0){
   return this.props.history.push(`/${flag}/${searchText}`) }
    else{
      return  alert("Name or Address Blank");
    }
   }

  HotelRow = hotel => {
    return (
      <React.Fragment>
        <Link
          to={{ pathname: `/hotel/${hotel.id}` }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Grid
            container
            style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}
          >
            <Grid item xs={12} md={4}>
              <img
                alt="hotel"
                src={hotel.image}
                style={{ height: "300px", width: "100%" }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <div style={{ padding: "15px" }}>
                <div>
                  <Typography style={{ display: "inline-block" }} variant="h5">
                    {hotel.name}
                  </Typography>
                  <Box
                    component="fieldset"
                    mb={3}
                    borderColor="transparent"
                    style={{ display: "inline-block", float: "right" }}
                  >
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title={<RatingToolTip ratings={hotel.averageRating} />}
                      arrow
                    >
                      <Typography component="legend">
                        {/* <Link to={{ pathname: `/hotel/${hotel.id}`,state:{hotel} }} > */}
                        <Button style={{ background: "green", color: "white" }}>
                          {hotel.total_average_ratings}
                        </Button>
                        {/* </Link> */}

                        <Rating value={hotel.total_average_ratings} readOnly />
                      </Typography>
                    </Tooltip>
                    <small>
                      {hotel.no} {hotel.no > "1" ? "Ratings" : "Rating"}
                    </small>
                  </Box>
                </div>
                <div>
                  <Typography style={{ display: "inline-block" }}>
                    <LocationOnIcon style={{ display: "inline-block" }} />
                    <small style={{ display: "inline-block" }}>
                      {hotel.location}
                    </small>
                  </Typography>
                </div>
              </div>

              {/* <Link to={{ pathname: `/hotel/${hotel.id}`,state:{hotel} }} > */}

              <Box
                component="fieldset"
                mb={3}
                borderColor="transparent"
                style={{
                  display: "inline-block",
                  padding: "15px",
                  margin: "0px"
                }}
              >
                <Typography style={{ display: "inline-block", margin: "15px" }}>
                  <PoolIcon style={{ display: "block" }} />
                  Pool
                </Typography>
                <Typography style={{ display: "inline-block", margin: "15px" }}>
                  <FreeBreakfastIcon style={{ display: "block" }} />
                  BreakFast
                </Typography>
                <Typography style={{ display: "inline-block", margin: "15px" }}>
                  <LocalParkingIcon style={{ display: "block" }} />
                  Parking
                </Typography>
                <Typography style={{ display: "inline-block", margin: "15px" }}>
                  <BathtubIcon style={{ display: "block" }} />
                  Bathtub
                </Typography>
                <Typography style={{ display: "inline-block", margin: "15px" }}>
                  <VerifiedUserIcon style={{ display: "block" }} />
                  Verified
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Link>
      </React.Fragment>
    );
  };
  handlePageClick = data => {
    console.log("Selected:", data.selected);
    this.setState({ pg_no: data.selected }, () => this.loadHotels());
  };

  render() {
    return (
      <div>
          <Grid container>
          <Grid item xs= {3}>
          <Grid container>
          <Grid item style={{marginLeft:"20px", marginTop:"25px" }}xs= {4}>
            <InputLabel style={{float:"right"}}id="demo-customized-select-label">Filter</InputLabel>
          </Grid>
          <Grid item xs= {7}>
          <Select style={{width:"80%",marginTop:"15px",marginLeft:"5px"  }}
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={this.state.flag}
            onChange={this.handleChange}
            //input={<BootstrapInput />}
          >
            <MenuItem value={"name"}>Name</MenuItem>
            <MenuItem value={"location"}>Location</MenuItem>
          </Select>
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs= {4}>
          <TextField
            fullWidth
            margin="normal"
            type="text"
            name="text"
            placeholder="Search With Hotel Or Address"
            value={this.state.searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
          ></TextField>
          </Grid>
          <Grid item xs={4}>
          <Button style={{ background: "blue", color: "white",margin:"15px" }} onClick={this.onSearchSubmit}>
            Search
          </Button>
          </Grid>
          </Grid>
        <Grid container spacing={1}>
          {this.state.hotels.map(hotel => {
            return (
              <Grid
                container
                item
                style={{
                  border: "solid black 2px",
                  borderRadius: "5px",
                  margin: "2%"
                }}
                key={hotel.id}
              >
                {this.HotelRow(hotel)}
              </Grid>
            );
          })}
        </Grid>
        <div className="rating-pagination-div container">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pg_no}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"page-active"}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(HotelList);