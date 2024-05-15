import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";

function EventsPage() {
  const { id } = useParams();
  const [events, setEvents] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: event } = await axiosReq.get(`/events/${id}`);
        setEvents({ results: [event] });
        console.log(event);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles</p>
        <div className="d-lg-none">
          <p>Most popular events for mobile</p>
        </div>

        {events.results.length > 0 && (
          <Event {...events.results[0]} setEvents={setEvents} eventPage />
        )}
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Most popular events for desktop
      </Col>
    </Row>
  );
}

export default EventsPage;
