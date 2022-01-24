import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";

import "../../../styles/home.scss";

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    }
  }, []);

  return (
    <div>
      <div id = "lr">
        <img src = "/images/left-arrow.png"/>
        <div>
          Hello World!
          {/* {this.state.loading ? <div>loading...</div> : <div>person...</div>} */}
        </div>
        <img src = "/images/right-arrow.png"/>
      </div>

      <a href = "../MakePost/MakePost.js">  
        <button>Respond</button>
      </a>
      
    </div>
    /*
    <div className="home-page">
      <Section>
        <Container></Container>
      </Section>
    </div>
    */
  );
}
