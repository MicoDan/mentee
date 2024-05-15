import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CameraVideoFill, MicFill } from 'react-bootstrap-icons';
import breakpoints from '../utils/breakpoints';
import Header from '../components/Header';
import { landingBackgroundImage, landingBackgroundColor } from '../config';
import { setRequestedMediaPerms } from '../store/sm';
import micFill from '../img/mic-fill.svg';
import videoFill from '../img/camera-video-fill.svg';

function Landing({ className }) {
  const { mic, camera } = useSelector(({ sm }) => sm.requestedMediaPerms);
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <div className="landing-wrapper">
        <Header />
        <div className="container d-flex">
          <div className="landing-container flex-grow-1">
            <div className="col-12 col-lg-6">
              <div className="row" style={{ marginBottom: '9px' }}>
                <div>
                  <h1 className="fw-bol font-sans">Meet Mary, your personal mental health assistant.</h1>
                </div>
              </div>
              <div className="row">
                <div>
                  <h4 className="fw-bold font-sans" style={{ marginBottom: '31px' }}>
                    Mary is always here to be with you through your healing process.
                  </h4>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '36px' }}>
                <div>
                  <div className="form-check form-switch">
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="micPermSwitch"
                    >
                      <input
                        className={`shadow form-check-input mic-switch switch ${
                          mic ? 'status-checked' : 'status-unchecked'
                        }`}
                        type="checkbox"
                        role="switch"
                        id="micPermSwitch"
                        onChange={() => dispatch(setRequestedMediaPerms({ mic: !mic }))}
                        checked={mic}
                      />
                      <div className="d-block ms-2 fw-bold font-sans">
                        Use your microphone so I can hear you.
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '52px' }}>
                <div>
                  <div className="form-check form-switch">
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor="cameraPermSwitch"
                    >
                      <input
                        className={`shadow form-check-input video-switch switch ${
                          camera ? 'status-checked' : 'status-unchecked'
                        }`}
                        type="checkbox"
                        role="switch"
                        id="micPermSwitch"
                        onChange={() => dispatch(setRequestedMediaPerms({ camera: !camera }))}
                        checked={camera}
                      />
                      <div className="d-block ms-2 fw-bold font-sans">
                        Use your camera so we can chat face-to-face.
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginBottom: '60px' }}>
                <div>
                  <Link
                    to="/loading"
                    className="shadow btn primary-accent fs-3 fw-bold font-sans"
                    type="button"
                  >
                    Chat with Mary
                  </Link>
                </div>
              </div>
              <div className="col" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Landing)`
.landing-wrapper {
  min-height: 100vh;

  background: ${landingBackgroundImage ? `url(${landingBackgroundImage})` : ''} ${landingBackgroundColor ? `${landingBackgroundColor};` : ''};
  background-size: auto 40%; 
  background-repeat: no-repeat;
  background-position: calc(50% - 20px) bottom; 

  @media (min-width: ${breakpoints.lg}px) {
    background-size: 40% auto; 
    background-position: calc(50% + 400px) bottom; 
  }
}


  .landing-container {
    padding-top: 1rem;
    display: flex;

    &>div {
      background-color: ${Color(landingBackgroundColor).alpha(0.5)};
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0,0,0,0.1);
      padding: 1rem;
      border-radius: 5px;

      @media (min-width: ${breakpoints.lg}px) {
        border: none;
      }
    }
  }
  .form-switch .form-check-input {
    min-width: 7rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;


    &.mic-switch::before, &.mic-switch.status-checked::after {
        background-image: url(${micFill});
    }
    &.video-switch::before, &.video-switch.status-checked::after {
        background-image: url(${videoFill});
    }
    &.mic-switch.status-checked::before, &.video-switch.status-checked::before {
      background-image: none;
    }

    &.status-unchecked {
      &::after {
        content: 'OFF';
        color: #27c22f;
        margin-right: 18%;
      }
      &::before {
        background-size: 60%;
        background-repeat: no-repeat;
        background-color:  #27c22f;
        background-position: 45% center;
        content: '';
        display: block;

        border-radius: 50%;

        height: 80%;
        margin-left: 5%;
        aspect-ratio: 1;
        float: right;
      }
    }

    &.status-checked {
      &::before {
        content: 'ON';
        color: #FFF;
        margin-left: 22%;
      }

      &::after {
        background-size: 60%;
        background-repeat: no-repeat;
        background-color: #FFF;
        background-position: 55% center;
        content: '';
        display: block;

        border-radius: 50%;

        height: 80%;
        margin-right: 5%;
        aspect-ratio: 1;
        float: right;
      }
    }
  }

`;
