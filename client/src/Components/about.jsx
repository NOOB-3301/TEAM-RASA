import Navbar from "./Navbar";
const AboutUs = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.heading}>About Our Journey - Team RASA</h1>
      <p style={styles.paragraph}>
        In the ever-evolving world of technology, a team of passionate
        individuals came together with a shared vision—to build something
        extraordinary.RASA, an embodiment of innovation and dedication, was
        founded by three tech enthusiasts: Raunit Jaiswal, Subhankar Rajbanshi,
        and Arka Basak. Each member brought a unique skill set, bound by the
        common goal of crafting a digital platform that redefines user
        experience.
      </p>
      <p style={styles.paragraph}>
        From the initial brainstorming sessions to late-night coding marathons,
        we poured our hearts into this project. Challenges were inevitable, but
        our resilience and teamwork turned obstacles into stepping stones.
        Through countless iterations, debugging sessions, and creative
        breakthroughs, we sculpted a website that stands as a testament to our
        relentless pursuit of excellence.
      </p>
      <p style={styles.paragraph}>
        Every pixel, every line of code, and every interactive element reflects
        our commitment to perfection. We have meticulously designed an intuitive
        interface that seamlessly blends aesthetics with functionality. The
        color palette—dominated by #0F6B5E and #14887a— was chosen to invoke
        trust, harmony, and a sense of clarity, ensuring that our users feel at
        home the moment they land on our platform.
      </p>
      <p style={styles.paragraph}>
        Our journey is far from over. This is just the beginning. We envision
        scaling new heights, enhancing our platform, and constantly innovating
        to meet the dynamic needs of the digital landscape. Team RASA is not
        just a group of developers; we are creators, dreamers, and problem
        solvers on a mission to revolutionize the web.
      </p>
      <p style={styles.thankYou}>
        Thank you for being a part of our journey.Here's to endless
        possibilities!
      </p>
    </div>
  );
};

// 💡 Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "40px auto",
  },
  heading: {
    fontSize: "30px",
    color: "#0F6B5E",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: "18px",
    color: "#444",
    lineHeight: "1.8",
    marginBottom: "15px",
    textAlign: "justify",
  },
  thankYou: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#14887a",
    marginTop: "25px",
  },
};

export default AboutUs;
