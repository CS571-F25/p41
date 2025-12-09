import React, { useState, useEffect } from "react";
import "../styles/InspiringQuote.css";

const quotes = [
  {
    text: "When we strive to become better than we are, everything around us becomes better too.",
    author: "Paulo Coelho",
  },
  {
    text: "Just one small positive thought in the morning can change your whole day.",
    author: "Dalai Lama",
  },
  {
    text: "Motivation is a fire from within. If someone else tries to light that fire under you, chances are it will burn very briefly.",
    author: "Stephen R. Covey",
  },
  {
    text: "I have discovered in life that there are ways of getting almost anywhere you want to go, if you really want to go.",
    author: "Langston Hughes",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  { text: "Do or do not. There is no try.", author: "Yoda" },
  {
    text: "Go slow to go fast. If we do each thing calmly and carefully we will get it done quicker and with much less stress.",
    author: "Viggo Mortensen",
  },
  {
    text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    author: "Stephen Covey",
  },
  {
    text: "You were born to win, but to be a winner, you must plan to win, prepare to win, and expect to win.",
    author: "Zig Ziglar",
  },
  {
    text: "It is no good getting furious if you get stuck. What I do is keep thinking about the problem but work on something else.",
    author: "Stephen Hawking",
  },
  {
    text: "Reflect on what you do in a day. You may have never realized how some simple, harmless activities rob you of precious time.",
    author: "Vivek Naik",
  },
  {
    text: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson",
  },
  {
    text: "To practice any art, no matter how well or badly, is a way to make your soul grow. So do it.",
    author: "Kurt Vonnegut",
  },
  {
    text: "Creativity involves breaking out of expected patterns in order to look at things in a different way.",
    author: "Edward de Bono",
  },
  { text: "Create with the heart; build with the mind.", author: "Criss Jami" },
  {
    text: "Enthusiasm is excitement with inspiration, motivation, and a pinch of creativity.",
    author: "Bo Bennett",
  },
  {
    text: "Have no fear of perfection, you'll never reach it.",
    author: "Salvador Dali",
  },
  {
    text: "We spend precious hours fearing the inevitable. It would be wise to use that time adoring our families, cherishing our friends and living our lives.",
    author: "Maya Angelou",
  },
  {
    text: "In the depth of winter, I finally learned that there was in me an invincible summer.",
    author: "Albert Camus",
  },
  {
    text: "The human capacity for burden is like bamboo – far more flexible than you'd ever believe at first glance.",
    author: "Jodi Picoult",
  },
  {
    text: "The oak fought the wind and was broken, the willow bent when it must and survived.",
    author: "Robert Jordan",
  },
  {
    text: "The very least you can do in your life is figure out what you hope for. And the most you can do is live inside that hope.",
    author: "Barbara Kingsolver",
  },
  {
    text: "Hope is the thing with feathers that perches in the soul - and sings the tunes without the words - and never stops at all.",
    author: "Emily Dickinson",
  },
  {
    text: "Hope can be a powerful force. When you know what you hope for most and hold it like a light within you, you can make things happen, almost like magic.",
    author: "Laini Taylor",
  },
  {
    text: "Hope begins in the dark. The stubborn hope that if you just show up and try to do the right thing, the dawn will come.",
    author: "Anne Lamott",
  },
  {
    text: "Nothing is less productive than to make more efficient what should not be done at all.",
    author: "Peter Drucker",
  },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  {
    text: "If you don't pay appropriate attention to what has your attention, it will take more of your attention than it deserves.",
    author: "David Allen",
  },
  {
    text: "What looks like multitasking is really switching back and forth between multiple tasks, which reduces productivity and increases mistakes by up to 50 percent.",
    author: "Susan Cain",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Effective performance is preceded by painstaking preparation.",
    author: "Brian Tracy",
  },
  {
    text: "You don't have to see the whole staircase, just take the first step.",
    author: "Martin Luther King",
  },
  {
    text: "Tomorrow becomes never. No matter how small the task, take the first step now!",
    author: "Tim Ferriss",
  },
  {
    text: "Amplifying what is great within you will accelerate your life faster than fixing what you think limits you.",
    author: "Brendon Burchard",
  },
  {
    text: "The question isn't who is going to let me, it's who is going to stop me.",
    author: "Ayn Rand",
  },
];

const InspiringQuote = ({ autoRotateInterval = 60000 }) => {
  const [currentQuote, setCurrentQuote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });
  const [isVisible, setIsVisible] = useState(true);

  const getNewQuote = () => {
    setIsVisible(false);
    setTimeout(() => {
      let newQuote;
      do {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        newQuote = quotes[randomIndex];
      } while (newQuote.text === currentQuote.text && quotes.length > 1);
      setCurrentQuote(newQuote);
      setIsVisible(true);
    }, 300);
  };

  // Auto-rotate quotes
  useEffect(() => {
    if (autoRotateInterval > 0) {
      const interval = setInterval(() => {
        getNewQuote();
      }, autoRotateInterval);

      return () => clearInterval(interval);
    }
  }, [autoRotateInterval, currentQuote]);

  return (
    <div className={`inspiring-quote ${isVisible ? "visible" : ""}`}>
      <p className="quote-text">"{currentQuote.text}"</p>
      <div className="quote-footer">
        <span className="quote-author">— {currentQuote.author}</span>
        <button
          className="quote-refresh"
          onClick={getNewQuote}
          title="New quote"
        >
          ↻
        </button>
      </div>
    </div>
  );
};

export default InspiringQuote;
