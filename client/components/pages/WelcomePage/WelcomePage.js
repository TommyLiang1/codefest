import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import Title from "react-bulma-companion/lib/Title";
import Box from "react-bulma-companion/lib/Box";
import Icon from "react-bulma-companion/lib/Icon";
import Columns from "react-bulma-companion/lib/Columns";
import Column from "react-bulma-companion/lib/Column";
import Button from "react-bulma-companion/lib/Button";
import Image from "react-bulma-companion/lib/Image";
import Field from "react-bulma-companion/lib/Field";
import Control from "react-bulma-companion/lib/Control";
import Textarea from "react-bulma-companion/lib/Textarea";
import Label from "react-bulma-companion/lib/Label";
import Help from "react-bulma-companion/lib/Help";
import Input from "react-bulma-companion/lib/Input";

export default function WelcomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push("/home"));
    }
  }, []);

  return (
    <div className="welcome-page page">
      <Section>
        <Container>
          <Columns>
            <Column size="half">
              <div className="moto">
                <p id="moto1">Express your concerns</p>
                <p id="moto2">
                  Foster a safe space and uplift the community by responding to
                  anonymous letters online.
                </p>
                <button id="getstarted">Get Started</button>
              </div>
            </Column>
            <Column>
              <Image>
                <Image.Content
                  className="home-img"
                  src={"/images/home.png"}
                  alt="Home"
                />
              </Image>
            </Column>
          </Columns>
        </Container>
      </Section>
    </div>
  );
}
