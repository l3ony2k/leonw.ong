const siteConfig = {
  // Personal information
  profile: {
    name: "leonw.ong",
    bio: "Live to the point of tears."
  },
  
  // Button configurations
  buttons: [
    {
      id: "lok",
      label: "@lok",
      type: "links",
      title: "@lok",
      links: [
        { text: "are.na", url: "https://are.na/lok" },
        { text: "omg.lol", url: "https://omg.lol/lok" },
        { text: "sourcehut", url: "https://sr.ht/~lok" },
        { text: "special.fish", url: "https://special.fish/lok" },
        { text: "neodb", url: "https://neodb.social/users/lok" },
        { text: "signal", url: "https://signal.me/#eu/8Q-JFgLhjGbsPSfgMHep65NmUJNKxTr1uyO-arsGq6AUf2ZaxrtPHY4WLiLrwm9D"}
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
        { text: "telegram", url: "https://t.me/l3on_y2k" }
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
    {
      id: "whiteboard",
      label: "whiteboard",
      type: "iframe",
      title: "Whiteboard",
      iframe: {
        src: "https://kinopio.club/embed/?spaceId=WxFUq5kPNkJ0gFgapKSGk&zoom=69",
        width: "100%"
        // Height is now controlled by CSS
      }
    }
  ]
};
