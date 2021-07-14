import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MicFill, MicMuteFill, XOctagonFill } from 'react-bootstrap-icons';
import {
  sendTextMessage, mute, stopSpeaking,
} from '../store/sm/index';

const Controls = ({
  className,
  intermediateUserUtterance,
  lastUserUtterance,
  userSpeaking,
  dispatchText,
  dispatchMute,
  isMuted,
  speechState,
  dispatchStopSpeaking,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [spinnerDisplay, setSpinnerDisplay] = useState('');
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  const handleInput = (e) => setInputValue(e.target.value);
  const handleFocus = () => {
    setInputFocused(true);
    setInputValue('');
  };
  const handleBlur = () => setInputFocused(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchText(inputValue);
    setInputValue('');
  };

  if (userSpeaking === false && lastUserUtterance !== '' && inputValue !== lastUserUtterance && inputFocused === false) setInputValue(lastUserUtterance);
  else if (userSpeaking === true && inputValue !== '' && inputFocused === false) setInputValue('');

  const spinner = '▖▘▝▗';
  const spinnerInterval = 100;
  useEffect(() => {
    setTimeout(() => {
      const nextDisplay = spinner[spinnerIndex];
      setSpinnerDisplay(nextDisplay);
      const nextIndex = (spinnerIndex === spinner.length - 1) ? 0 : spinnerIndex + 1;
      setSpinnerIndex(nextIndex);
    }, spinnerInterval);
  }, [spinnerIndex]);

  // clear placeholder text on reconnnect, sometimes the state updates won't propagate
  const placeholder = intermediateUserUtterance === '' ? '' : intermediateUserUtterance;
  return (
    <div className={className}>
      <div className="row mb-3">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <button type="button" className={`speaking-status btn btn-${isMuted ? 'outline-secondary' : 'danger '}`} onClick={dispatchMute} data-tip="Toggle Microphone Input">
                <div className={userSpeaking ? 'd-none' : ''}>
                  { isMuted ? <MicMuteFill size={21} /> : <MicFill size={21} /> }
                </div>
                { userSpeaking ? spinnerDisplay : null }
              </button>
              <input type="text" className="form-control" placeholder={placeholder} value={inputValue} onChange={handleInput} onFocus={handleFocus} onBlur={handleBlur} aria-label="User input" />
            </div>
          </form>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-outline-secondary" disabled={speechState !== 'speaking'} onClick={dispatchStopSpeaking} data-tip="Stop Speaking">
            <XOctagonFill size={21} />
          </button>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  className: PropTypes.string.isRequired,
  intermediateUserUtterance: PropTypes.string.isRequired,
  lastUserUtterance: PropTypes.string.isRequired,
  userSpeaking: PropTypes.bool.isRequired,
  dispatchText: PropTypes.func.isRequired,
  dispatchMute: PropTypes.func.isRequired,
  isMuted: PropTypes.bool.isRequired,
  speechState: PropTypes.string.isRequired,
  dispatchStopSpeaking: PropTypes.func.isRequired,
};

const StyledControls = styled(Controls)`
  display: ${(props) => (props.connected ? '' : 'none')};
  .row {
    max-width: 50rem;
    margin: 0px auto;
  }

  svg {
    /* make bootstrap icons vertically centered in buttons */
    margin-top: -0.1rem;
  }

  .form-control {
    opacity: 0.7;
    &:focus {
      opacity: 1;
    }
  }

  .speaking-status {
    width: 47px;
  }
`;

const mapStateToProps = (state) => ({
  intermediateUserUtterance: state.sm.intermediateUserUtterance,
  lastUserUtterance: state.sm.lastUserUtterance,
  userSpeaking: state.sm.userSpeaking,
  connected: state.sm.connected,
  isMuted: state.sm.isMuted,
  speechState: state.sm.speechState,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchText: (text) => dispatch(sendTextMessage({ text })),
  dispatchMute: () => dispatch(mute()),
  dispatchStopSpeaking: () => dispatch(stopSpeaking()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledControls);