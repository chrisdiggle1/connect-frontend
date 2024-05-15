import React from "react";
import { Link } from "react-router-dom";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Event = (props) => {
  console.log("Event props:", props);

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
    eventPage,
    likes_id,
    likes_count,
    image,
    category,
    title,
    event_date,
    description,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
        ) : likes_id ? (
          <span onClick={() => {}}>
            <i className={`fas fa-heart ${styles.Heart}`} />
          </span>
        ) : currentUser ? (
          <span onClick={() => {}}>
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
      </div>
    </Card.Body>
  </Card>
  );
};

export default Event;
