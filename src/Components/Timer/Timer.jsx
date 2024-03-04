import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const Timer = ({ todos, setTodos, id, min, sec, timerPoint }) => {
  const minutes = timerPoint ? min - convert(Date.now() - timerPoint).minutes : min;
  const seconds = timerPoint ? sec - convert(Date.now() - timerPoint).seconds : sec;
  const [timer, setTimer] = useState(minutes * 60000 + seconds * 1000);
  const intervalRef = useRef();

  const startTimer = (id) => {
    if (timer > 0) {
      setTodos((todos) => {
        const idx = todos.findIndex((el) => el.id === id);
        const oldItem = todos[idx];
        const newItem = { ...oldItem, isCounting: true, timerPoint: Date.now() };
        return [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
      });
    }
  };

  const stopTimer = (id) => {
    setTodos((todos) => {
      const idx = todos.findIndex((el) => el.id === id);
      const oldItem = todos[idx];
      const newItem = {
        ...oldItem,
        isCounting: false,
        timerPoint: null,
      };
      return [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
    });
  };

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const isActiveCheck = (id) => {
    const idx = todos.findIndex((el) => el.id === id);
    const oldItem = todos[idx];
    return oldItem.isCounting;
  };

  function convert(time) {
    return {
      minutes: Math.floor(time / 60000),
      seconds: Math.floor((time % 60000) / 1000),
    };
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isActiveCheck(id)) {
        if (timer > 0) {
          setTimer((timer) => timer - 1000);
        } else {
          clearInterval(intervalRef.current);
          setTodos((todos) => {
            const idx = todos.findIndex((el) => el.id === id);
            const oldItem = todos[idx];
            const newItem = { ...oldItem, isCounting: false, out: true };
            return [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isActiveCheck(id), timer]);

  useEffect(() => {
    isActiveCheck(id) &&
      setTodos((todos) => {
        const idx = todos.findIndex((el) => el.id === id);
        const oldItem = todos[idx];
        const newItem = { ...oldItem, timerPoint: Date.now() };
        return [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
      });
  }, []);

  useEffect(() => {
    return () => {
      setTodos((todos) => {
        const idx = todos.findIndex((el) => el.id === id);
        const oldItem = todos[idx];
        const newItem = {
          ...oldItem,
          min: convert(timer).minutes,
          sec: convert(timer).seconds,
        };
        return [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];
      });
    };
  }, [isActiveCheck(id)]);

  return (
    <span className="description">
      <button type="button"></button>
      <button type="button" className="icon icon-play" onClick={() => startTimer(id)} />
      <button type="button" className="icon icon-pause" onClick={() => stopTimer(id)} />
      <span>
        &nbsp; &nbsp;
        {formatTime(convert(timer).minutes)}:{formatTime(convert(timer).seconds)}
      </span>
    </span>
  );
};

Timer.defaultProps = {
  todos: [],
  setTodos: () => {},
  id: 0,
  min: 59,
  sec: 59,
  timerPoint: null,
};

Timer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  setTodos: PropTypes.func,
  id: PropTypes.number,
  min: PropTypes.number,
  sec: PropTypes.number,
  timerPoint: PropTypes.number,
};
