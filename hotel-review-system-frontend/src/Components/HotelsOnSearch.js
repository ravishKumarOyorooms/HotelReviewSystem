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
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

export default class HotelsOnSearch extends Component {
  state = {
    hotels: [],
    flag: "",
    searchText: ""
  };

  componentDidMount= async()=>{
    
    const flag=this.props.match.params.flag;
    
    const searchItem=this.props.match.params.name;
   
    
    {
       const res=await Axios.get(`http://localhost:8080/hotels/search/${flag}/${searchItem}`);
       this.setState({hotels:res.data});
       console.log(res.data);
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
  render() {
    return (
      <div>
        <Grid container spacing={1}>
          
          {this.state.hotels.length?this.state.hotels.map(hotel => {
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
          }):(<div><h1>Hotels Not Found</h1></div>)}
        </Grid>
      </div>
    );
  }
}
