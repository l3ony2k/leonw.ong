const siteConfig = {
  // Personal information
  profile: {
    name: "leonw.ong"
  },

  // About section with HTML content support
  about: {
    title: "About",
    content: `
      <p style="padding: 0px 15px; border-left: 2px solid; font-family: 'Times New Roman', serif; font-style: italic; font-size: 20px;">
        “Men must live and create. Live to the point of tears.” – Albert Camus
      </p>
      <p>
        Hello there, and welcome! I'm Leon / Lok, a curious soul who finds joy in exploring every corner of the web. I'm not a designer or developer, I just love creating and tinkering digital / physical things.
      </p>
      <p>
        This is my personal space, not much going on here, but still feel free to wander through and poke around. Every visit inspires me, and I hope you feel just as welcomed here.
      </p>
      <p>
        There are <span class="tinylytics_hits">00</span> views on this page so far, and you can click the button below to send some positive vibes my way. <button class="tinylytics_kudos">👋00</button>
      </p>
    `
  },

  // Button configurations
  buttons: [
    {
      id: "social",
      label: "social",
      type: "social",
      title: "Social",
      socialColumns: [
        {
          title: "@lok",
          links: [
            { text: "are.na", url: "https://are.na/lok" },
            { text: "bsky", url: "https://lok.on.computer" },
            { text: "omg.lol", url: "https://lok.omg.lol" },
            { text: "special.fish", url: "https://special.fish/lok" },
            { text: "sr.ht", url: "https://sr.ht/~lok" },
            // { text: "nekoweb", url: "https://lok.nekoweb.org" },
            { text: "neodb", url: "https://neodb.social/users/lok" },
            { text: "signal", url: "https://signal.me/#eu/8Q-JFgLhjGbsPSfgMHep65NmUJNKxTr1uyO-arsGq6AUf2ZaxrtPHY4WLiLrwm9D" }
          ]
        },
        {
          title: "@l3on_y2k",
          links: [
            { text: "github", url: "https://github.com/l3ony2k" },
            { text: "instagram", url: "https://instagram.com/l3on_y2k" },
            { text: "twitter", url: "https://twitter.com/l3on_y2k" },
            { text: "reddit", url: "https://reddit.com/user/l3on_y2k" },
            { text: "telegram", url: "https://t.me/l3on_y2k" },
            { text: "letterboxd", url: "https://letterboxd.com/l3on_y2k/" },
            { text: "mail", url: "mailto:l3on.y2k@gmail.com" }
          ]
        }
      ]
    },
    {
      id: "projects",
      label: "projects",
      type: "projects",
      title: "Projects",
      projects: [
        {
          id: "canvas-project",
          title: "are.na blocks canvas",
          description: "A visual tool for exploring are.na blocks in a canvas interface. allows you to interact with are.na blocks in a more spatial and intuitive way.",
          iframe: "https://abc.lok.computer",
          actions: [
            { text: "visit site", url: "https://abc.lok.computer" },
            { text: "view repo", url: "https://github.com/l3ony2k/are.na-blocks-canvas" }
          ]
        },
        {
          id: "computer-project",
          title: "lok.computer",
          description: "A mini desktop-like environment with modular apps including are.na browser, weather app, and more.",
          iframe: "https://lok.computer",
          actions: [
            { text: "visit site", url: "https://lok.computer" },
            { text: "view repo", url: "https://github.com/l3ony2k/lok.computer" }
          ]
        },
        {
          id: "feed-project",
          title: "are.na blocks feed",
          description: "A minimalist thoughts feed that displays blocks from your Are.na channel, heavily inspired by thoughts.page.",
          iframe: "https://journal.lok.computer",
          actions: [
            { text: "visit site", url: "https://journal.lok.computer" },
            { text: "view repo", url: "https://github.com/l3ony2k/are.na-blocks-feed" }
          ]
        }
      ]
    },
    {
      id: "mail",
      label: "mail",
      type: "iframe",
      title: "Mail",
      iframe: {
        src: "https://letterbird.co/lok",
        width: "100%"
        // Height is now controlled by CSS
      }
    },
    // {
    //   id: "kinopio",
    //   label: "kinopio",
    //   type: "iframe",
    //   title: "Kinopio",
    //   iframe: {
    //     src: "https://kinopio.club/embed/?spaceId=WxFUq5kPNkJ0gFgapKSGk&zoom=69",
    //     width: "100%"
    //     // Height is now controlled by CSS
    //   }
    // },
    {
      id: "blog",
      label: "blog",
      type: "iframe",
      title: "Blog",
      iframe: {
        src: "https://l3on.site/",
        width: "100%"
        // Height is now controlled by CSS
      }
    }

  ]
};
