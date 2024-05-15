import React from "react";
import { Link } from "react-router-dom";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_picture,
    comments_count,
    interested_count,
    attending_count,
    updated_at,
    attending_id,
    interested_id,
    eventPage,
    like_id,
    likes_count,
    image,
    category,
    title,
    event_date,
    description,
    setEvents,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    if (like_id) return;

    try {
      const { data } = await axiosRes.post("/likes/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((singleEvent) => {
          if (singleEvent.id === id) {
            return {
              ...singleEvent,
              likes_count: singleEvent.likes_count + 1,
              like_id: data.id,
            };
          }
          return singleEvent;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    if (!like_id) return;

    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((singleEvent) => {
          if (singleEvent.id === id) {
            return {
              ...singleEvent,
              likes_count: singleEvent.likes_count - 1,
              like_id: null,
            };
          }
          return singleEvent;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeOrUnlike = () => {
    if (like_id) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  const handleAttend = async () => {
    if (attending_id) return;

    try {
      const { data } = await axiosRes.post("/attending/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((singleEvent) => {
          if (singleEvent.id === id) {
            return {
              ...singleEvent,
              attending_count: singleEvent.attending_count + 1,
              attending_id: data.id,
            };
          }
          return singleEvent;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnattend = async () => {
    if (!attending_id) return;

    try {
      await axiosRes.delete(`/attending/${attending_id}/`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((singleEvent) => {
          if (singleEvent.id === id) {
            return {
              ...singleEvent,
              attending_count: singleEvent.attending_count - 1,
              attending_id: null,
            };
          }
          return singleEvent;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttendOrUnattend = () => {
    if (attending_id) {
      handleUnattend();
    } else {
      handleAttend();
    }
  };

  const handleInterested = async () => {
    if (interested_id) return;

    try {
      const { data } = await axiosRes.post("/interested/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((singleEvent) => {
          if (singleEvent.id === id) {
            return {
              ...singleEvent,
              interested_count: singleEvent.interested_count + 1,
              interested_id: data.id,
            };
          }
          return singleEvent;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUninterested = async () => {
    if (!interested_id) return;

    try {
      await axiosRes.delete(`/interested/${interested_id}/`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((singleEvent) => {
          if (singleEvent.id === id) {
            return {
              ...singleEvent,
              interested_count: singleEvent.interested_count - 1,
              interested_id: null,
            };
          }
          return singleEvent;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleInterestedOrUninterested = () => {
    if (interested_id) {
      handleUninterested();
    } else {
      handleInterested();
    }
  };

  return (
    <Card className={styles.Event}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_picture} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{new Date(updated_at).toLocaleDateString()}</span>
            {is_owner && eventPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/events/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && event_date && (
          <Card.Title className="text-center">
            {title} - {new Date(event_date).toLocaleDateString()}
          </Card.Title>
        )}
        {description && <Card.Text>{description}</Card.Text>}
        <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleLikeOrUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLikeOrUnlike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/events/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't attend your own event!</Tooltip>}
            >
              <i className="fa-solid fa-circle-check" />
            </OverlayTrigger>
          ) : attending_id ? (
            <span onClick={handleAttendOrUnattend}>
              <i className={`fa-solid fa-circle-check ${styles.Check}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleAttendOrUnattend}>
              <i className={`fa-regular fa-circle-check ${styles.CheckOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to attend events!</Tooltip>}
            >
              <i className="fa-regular fa-circle-check" />
            </OverlayTrigger>
          )}
          {attending_count}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't be interested in your own event!</Tooltip>}
            >
              <i className="fa-regular fa-calendar" />
            </OverlayTrigger>
          ) : interested_id ? (
            <span onClick={handleInterestedOrUninterested}>
              <i className={`fa-regular fa-calendar ${styles.Interested}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleInterestedOrUninterested}>
              <i className={`fa-regular fa-calendar ${styles.InterestedOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to show interest in events!</Tooltip>}
            >
              <i className="fa-regular fa-calendar" />
            </OverlayTrigger>
          )}
          {interested_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Event;
