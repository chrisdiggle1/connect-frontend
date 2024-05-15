import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Event from "./Event";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";

import appStyles from "../../App.module.css";
import styles from "../../styles/EventPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";

function EventPage({ message, filter = "" }) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/?${filter}&search=${searchQuery}`
        );
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchEvents();
  }, [filter, pathname, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Form className={styles.SearchBar} onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Search events"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form>
        {hasLoaded ? (
          <>
            {events.results.length ? (
              events.results.map((event) => (
                <Event key={event.id} {...event} setEvents={setEvents} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default EventPage;
