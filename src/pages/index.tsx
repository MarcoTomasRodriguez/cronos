import { useEffect, useRef } from "react";
import { interval } from "rxjs";
import Layout from "@components/Layout";
import Timers from "@components/Timers";
import { TimerStatus } from "@typeDefs/timer";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { countdownTimers } from "@store/slices/timerSlice";

const Index = () => {
  const dispatch = useAppDispatch();
  const { timers, ringing, running } = useAppSelector((state) => state.timer);

  const ring = useRef(new Audio("/effects/ring.mp3"));

  useEffect(() => {
    const subscription = interval(1000).pipe().subscribe({ next: countdown });

    ring.current.preload = "auto";
    ring.current.loop = false;
    ring.current.volume = 0;

    return () => subscription.unsubscribe();
  }, []);

  const countdown = () => {
    console.log("Countdown");

    // If some timer is currently running, countdown every active timer.
    if (running.length > 0) {
      console.log("Some is running");
      dispatch(countdownTimers());
    }

    // If some timer is currently ringing, reproduce continuously the ring till the user cancels every bell.
    if (ringing.length > 0) {
      console.log("Some is ringing");
      ring.current.volume = 1;
      ring.current.play();
    }
  };

  return (
    <Layout title="Cronos">
      <Timers timers={timers} />
    </Layout>
  );
};

export default Index;
