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
      id: "lok",
      label: "@lok",
      type: "links",
      title: "@lok",
      links: [
        { text: "bluesky", url: "https://lok.on.computer" },
        { text: "are.na", url: "https://are.na/lok" },
        { text: "omg.lol", url: "https://lok.omg.lol" },
        { text: "special.fish", url: "https://special.fish/lok" },
        { text: "sourcehut", url: "https://sr.ht/~lok" },
        { text: "nekoweb", url: "https://lok.nekoweb.org" },
        { text: "neodb", url: "https://neodb.social/users/lok" },
        { text: "signal: lok.96", url: "https://signal.me/#eu/8Q-JFgLhjGbsPSfgMHep65NmUJNKxTr1uyO-arsGq6AUf2ZaxrtPHY4WLiLrwm9D" }
      ]
    },
    {
      id: "l3on",
      label: "@l3on_y2k",
      type: "links",
      title: "@l3on_y2k",
      links: [
        { text: "instagram", url: "https://instagram.com/l3on_y2k" },
        { text: "twitter", url: "https://twitter.com/l3on_y2k" },
        { text: "reddit", url: "https://reddit.com/user/l3on_y2k" },
        { text: "telegram", url: "https://t.me/l3on_y2k" },
        { text: "github", url: "https://github.com/l3ony2k" }
      ]
    }, {
      id: "projects",
      label: "projects",
      type: "iframe",
      title: "Projects",
      iframe: {
        src: "https://www.are.na/lok/things-i-created/embed",
        width: "100%"
        // Height is now controlled by CSS
      }
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
    {
      id: "kinopio",
      label: "kinopio",
      type: "iframe",
      title: "Kinopio",
      iframe: {
        src: "https://kinopio.club/embed/?spaceId=WxFUq5kPNkJ0gFgapKSGk&zoom=69",
        width: "100%"
        // Height is now controlled by CSS
      }
    },
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
