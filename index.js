// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function () {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDhL4CW6paTdchBzL2iTpNKInJSZI-gzQE",
    authDomain: "dorochat-cc015.firebaseapp.com",
    projectId: "dorochat-cc015",
    storageBucket: "dorochat-cc015.firebasestorage.app",
    messagingSenderId: "629677703886",
    appId: "1:629677703886:web:73987e201e59593f13c69f",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // This is very IMPORTANT!! We're going to use "db" a lot.
  var db = firebase.database();
  // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
  class MEME_CHAT {
    constructor() {
      this.room = "World Chat"; // Default room
      this.notificationsEnabled = this.get_notifications_enabled();
    }

    // Home() is used to create the home page
    home() {
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = "";
      this.create_title();
      this.create_join_form();
    }

    // chat() is used to create the chat page
    chat() {
      this.create_title();
      this.create_chat();
    }

    // create_title() is used to create the title
    create_title() {
      // This is the title creator. 🎉
      var title_container = document.createElement("div");
      title_container.setAttribute("id", "title_container");
      var title_inner_container = document.createElement("div");
      title_inner_container.setAttribute("id", "title_inner_container");

      var title = document.createElement("h1");
      title.setAttribute("id", "title");
      title.textContent = "~BroChat~";

      // Create the <a> element
      var madeBy = document.createElement("a");
      madeBy.setAttribute("id", "made_by");
      madeBy.setAttribute("href", "https://www.facebook.com/Doraemon"); // Set the link URL
      madeBy.setAttribute("target", "_blank"); // Open link in a new tab
      madeBy.textContent = "Made by Nazim";

      // Create the notification toggle button
      var notificationToggle = document.createElement("button");
      notificationToggle.setAttribute("id", "notification_toggle");
      notificationToggle.textContent = this.notificationsEnabled
        ? "Notification Is ON"
        : "Notification Is OFF";
      notificationToggle.onclick = () => {
        this.notificationsEnabled = !this.notificationsEnabled;
        this.save_notifications_enabled(this.notificationsEnabled);
        notificationToggle.textContent = this.notificationsEnabled
          ? "Notification Is ON"
          : "Notification Is OFF";
      };

      // Apply flexbox to align them in a column
      var titleContainerStyle = document.createElement("style");
      titleContainerStyle.textContent = `
  #title_inner_container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center align items */
    gap: 10px; /* Add spacing between elements */
  }
  #made_by {
    text-decoration: none; /* Remove underline */
   
    font-size: 14px; /* Adjust font size */
  }
  #made_by:hover {
    text-decoration: underline; /* Add underline on hover */
  }
`;

      document.head.append(titleContainerStyle);

      // Append the elements
      title_inner_container.append(title, madeBy, notificationToggle); // Append both the title and the link
      title_container.append(title_inner_container);
      document.body.append(title_container);
    }

    // create_join_form() creates the join form
    create_join_form() {
      // YOU MUST HAVE (PARENT = THIS). OR NOT. I'M NOT YOUR BOSS!😂
      var parent = this;

      var join_container = document.createElement("div");
      join_container.setAttribute("id", "join_container");
      var join_inner_container = document.createElement("div");
      join_inner_container.setAttribute("id", "join_inner_container");

      var join_button_container = document.createElement("div");
      join_button_container.setAttribute("id", "join_button_container");

      var join_button = document.createElement("button");
      join_button.setAttribute("id", "join_button");
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>';

      var join_input_container = document.createElement("div");
      join_input_container.setAttribute("id", "join_input_container");

      var join_input = document.createElement("input");
      join_input.setAttribute("id", "join_input");
      join_input.setAttribute("maxlength", 28);
      join_input.placeholder = "Whats is your name?...";

      var room_input_container = document.createElement("div");
      room_input_container.setAttribute("id", "room_input_container");

      var room_input = document.createElement("input");
      room_input.setAttribute("id", "room_input");
      room_input.setAttribute("maxlength", 30);
      room_input.placeholder = "Enter room name (default: World Chat)...";

      // Every time we type into the join_input
      join_input.onkeyup = function () {
        // If the input we have is longer that 0 letters
        if (join_input.value.length > 0) {
          // Make the button light up
          join_button.classList.add("enabled");
          // Allow the user to click the button
          join_button.onclick = function () {
            // Save the name to local storage. Passing in
            // the join_input.value
            parent.save_name(join_input.value);
            // Save the room to local storage. Passing in
            // the room_input.value or default to "World Chat"
            parent.save_room(room_input.value || "World Chat");
            // Remove the join_container. So the site doesn't look weird.
            join_container.remove();
            // parent = this. But it is not the join_button
            // It is (MEME_CHAT = this).
            parent.create_chat();
          };
        } else {
          // If the join_input is empty then turn off the
          // join button
          join_button.classList.remove("enabled");
        }
      };

      // Append everything to the body
      join_button_container.append(join_button);
      join_input_container.append(join_input);
      room_input_container.append(room_input);
      join_inner_container.append(
        join_input_container,
        room_input_container,
        join_button_container
      );
      join_container.append(join_inner_container);
      document.body.append(join_container);
    }

    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id) {
      // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.

      // This is a loading function. Something cool to have.
      var container = document.getElementById(container_id);
      container.innerHTML = "";

      var loader_container = document.createElement("div");
      loader_container.setAttribute("class", "loader_container");

      var loader = document.createElement("div");
      loader.setAttribute("class", "loader");

      loader_container.append(loader);
      container.append(loader_container);
    }

    // create_chat() creates the chat container and stuff
    create_chat() {
      // Again! You need to have (parent = this)
      var parent = this;
      // GET THAT DOROCHAT HEADER OUTTA HERE
      var title_container = document.getElementById("title_container");
      var title = document.getElementById("title");
      title_container.classList.add("chat_title_container");
      // Make the title smaller by making it 'chat_title'
      title.classList.add("chat_title");

      var chat_container = document.createElement("div");
      chat_container.setAttribute("id", "chat_container");

      var chat_inner_container = document.createElement("div");
      chat_inner_container.setAttribute("id", "chat_inner_container");

      var chat_content_container = document.createElement("div");
      chat_content_container.setAttribute("id", "chat_content_container");

      var chat_input_container = document.createElement("div");
      chat_input_container.setAttribute("id", "chat_input_container");
      var chat_input_send = document.createElement("button");
      chat_input_send.setAttribute("id", "chat_input_send");
      chat_input_send.setAttribute("disabled", true);
      chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`;

      var chat_input = document.createElement("input");
      chat_input.setAttribute("id", "chat_input");
      // Only a max message length of 1000
      chat_input.setAttribute("maxlength", 1000);
      // Get the name of the user
      chat_input.placeholder = `${parent.get_name()}. Say something...`;

      // Handle key events, including the Enter key
      chat_input.onkeyup = function (event) {
        if (chat_input.value.length > 0) {
          chat_input_send.removeAttribute("disabled");
          chat_input_send.classList.add("enabled");

          // Check if the Enter key is pressed (keyCode 13 or "Enter")
          if (event.key === "Enter" || event.keyCode === 13) {
            chat_input_send.click(); // Trigger the button click programmatically
          }

          // Add a click event to send the message
          chat_input_send.onclick = function () {
            chat_input_send.setAttribute("disabled", true);
            chat_input_send.classList.remove("enabled");

            if (chat_input.value.length <= 0) {
              return;
            }

            // Enable the loading circle in the 'chat_content_container'
            parent.create_load("chat_content_container");
            // Send the message. Pass in the chat_input.value
            parent.send_message(chat_input.value);
            // Clear the chat input box
            chat_input.value = "";
            // Focus on the input just after
            chat_input.focus();
          };
        } else {
          chat_input_send.setAttribute("disabled", true);
          chat_input_send.classList.remove("enabled");
        }
      };

      var chat_logout_container = document.createElement("div");
      chat_logout_container.setAttribute("id", "chat_logout_container");

      var chat_logout = document.createElement("button");
      chat_logout.setAttribute("id", "chat_logout");
      chat_logout.textContent = `${parent.get_name()} • logout`;
      // "Logout" is really just deleting the name from the localStorage
      chat_logout.onclick = function () {
        localStorage.clear();
        // Go back to home page
        parent.home();
      };

      // Create the online users container
      var online_users_container = document.createElement("div");
      online_users_container.setAttribute("id", "online_users_container");
      online_users_container.innerHTML = "Online Users: 0";
      online_users_container.style.textAlign = "center";
      online_users_container.style.color = "black";
      online_users_container.style.fontSize = "14px";
      online_users_container.style.marginTop = "10px";
      online_users_container.style.fontWeight = "bold";
      online_users_container.style.textTransform = "uppercase";
      online_users_container.style.fontFamily = "Arial, sans-serif";

      chat_inner_container.append(online_users_container);

      // Create the hide/unhide button
      var hide_button = document.createElement("button");
      hide_button.setAttribute("id", "hide_button");
      hide_button.textContent = "Hide Myself";
      hide_button.style.marginTop = "10px";
      hide_button.onclick = function () {
        if (hide_button.textContent === "Hide Myself") {
          userRef.remove();
          hide_button.textContent = "Unhide Myself";
        } else {
          userRef.set({
            name: app.get_name(),
            room: app.get_room(),
          });
          hide_button.textContent = "Hide Myself";
        }
      };

      chat_inner_container.append(hide_button);

      // Function to update online users
      function updateOnlineUsers() {
        db.ref("online_users/").on("value", function (snapshot) {
          var onlineUsers = snapshot.val() || {};
          var userCount = Object.keys(onlineUsers).length;
          var userList = Object.values(onlineUsers)
            .map((user) => `${user.name} (${user.room})`)
            .join("<br>"); // Use <br> to put each user on a new line
          online_users_container.innerHTML = `
        <details class="dropdown">
          <summary class="btn m-1 onlineUserDropdownName">Online Users (${userCount})</summary>
          <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          ${Object.values(onlineUsers)
            .map(
              (user) =>
                `<li><a class="usernameID">${user.name} (${user.room})</a></li>`
            )
            .join("")}
          </ul>
        </details>`;
        });
      }

      // Call the function to update online users
      updateOnlineUsers();

      // Add the current user to the online users list
      var userRef = db.ref("online_users/" + app.get_name());
      userRef.set({
        name: app.get_name(),
        room: app.get_room(),
      });

      // Remove the user from the online users list when they disconnect
      userRef.onDisconnect().remove();

      chat_logout_container.append(chat_logout);
      chat_input_container.append(chat_input, chat_input_send);
      chat_inner_container.append(
        chat_content_container,
        chat_input_container,
        chat_logout_container
      );
      chat_container.append(chat_inner_container);
      document.body.append(chat_container);
      // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
      parent.create_load("chat_content_container");
      // then we "refresh" and get the chat data from Firebase
      parent.refresh_chat();
    }

    // Save name. It literally saves the name to localStorage
    save_name(name) {
      // Save name to localStorage
      localStorage.setItem("name", name);
    }

    // Save room. It literally saves the room to localStorage
    save_room(room) {
      // Save room to localStorage
      localStorage.setItem("room", room);
      this.room = room;
    }

    // Save notifications enabled state to localStorage
    save_notifications_enabled(enabled) {
      localStorage.setItem("notificationsEnabled", enabled);
    }

    // Get notifications enabled state from localStorage
    get_notifications_enabled() {
      return localStorage.getItem("notificationsEnabled") === "true";
    }

    // Sends message/saves the message to firebase database
    send_message(message) {
      var parent = this;
      // if the local storage name is null and there is no message
      // then return/don't send the message. The user is somehow hacking
      // to send messages. Or they just deleted the
      // localstorage themselves. But hacking sounds cooler!!
      if (parent.get_name() == null && message == null) {
        return;
      }

      // Get the current time in 12-hour format
      var currentDate = new Date();
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes().toString().padStart(2, "0");
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var time = `${hours}:${minutes} ${ampm}`;

      // Get the firebase database value
      db.ref(`chats/${parent.room}/`).once("value", function (message_object) {
        // This index is mordant. It will help organize the chat in order
        var index = parseFloat(message_object.numChildren()) + 1;
        db.ref(`chats/${parent.room}/` + `message_${index}`)
          .set({
            name: parent.get_name(),
            message: message,
            index: index,
            time: time,
          })
          .then(function () {
            // After we send the chat refresh to get the new messages
            parent.refresh_chat();
          });
      });
    }

    // Get name. Gets the username from localStorage
    get_name() {
      // Get the name from localstorage
      if (localStorage.getItem("name") != null) {
        return localStorage.getItem("name");
      } else {
        this.home();
        return null;
      }
    }

    // Get room. Gets the room from localStorage
    get_room() {
      // Get the room from localstorage
      if (localStorage.getItem("room") != null) {
        return localStorage.getItem("room");
      } else {
        this.room = "World Chat";
        return "World Chat";
      }
    }

    // Refresh chat gets the message/chat data from firebase
    refresh_chat() {
      var parent = this;
      var chat_content_container = document.getElementById(
        "chat_content_container"
      );

      // Get the chats from firebase
      db.ref(`chats/${parent.get_room()}/`).on(
        "value",
        function (messages_object) {
          // When we get the data clear chat_content_container
          chat_content_container.innerHTML = "";
          // if there are no messages in the chat. Return . Don't load anything
          if (messages_object.numChildren() == 0) {
            return;
          }

          // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
          // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!

          // convert the message object values to an array.
          var messages = Object.values(messages_object.val());
          var guide = []; // this will be our guide to organizing the messages
          var unordered = []; // unordered messages
          var ordered = []; // we're going to order these messages

          for (var i, i = 0; i < messages.length; i++) {
            // The guide is simply an array from 0 to the messages.length
            guide.push(i + 1);
            // unordered is the [message, index_of_the_message]
            unordered.push([messages[i], messages[i].index]);
          }

          // Now this is straight up from stack overflow
          // Sort the unordered messages by the guide
          guide.forEach(function (key) {
            var found = false;
            unordered = unordered.filter(function (item) {
              if (!found && item[1] == key) {
                // Now push the ordered messages to ordered array
                ordered.push(item[0]);
                found = true;
                return false;
              } else {
                return true;
              }
            });
          });

          // Now we're done. Simply display the ordered messages
          ordered.forEach(function (data) {
            var name = data.name;
            var message = data.message;

            // Create the main message container
            var message_container = document.createElement("div");
            message_container.setAttribute("class", "message_container");

            // Create the inner message container
            var message_inner_container = document.createElement("div");
            message_inner_container.setAttribute(
              "class",
              "message_inner_container"
            );

            // Create the user container
            var message_user_container = document.createElement("div");
            message_user_container.setAttribute(
              "class",
              "message_user_container"
            );

            var message_user = document.createElement("p");
            message_user.setAttribute("class", "message_user");
            message_user.textContent = `${name}`;

            // Create the message content container
            var message_content_container = document.createElement("div");
            message_content_container.setAttribute(
              "class",
              "message_content_container"
            );

            var message_content = document.createElement("p");
            message_content.setAttribute("class", "message_content");

            // Check if the message contains a URL
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            message_content.innerHTML = message.replace(
              urlRegex,
              function (url) {
                return `<a href="${url}" target="_blank">${url}</a>`;
              }
            );

            // Add a time element for the timestamp
            var message_time = document.createElement("p");
            message_time.setAttribute("class", "message_time");

            // Check if the message has a time; if not, default to "00:00"
            if (data.time) {
              message_time.textContent = data.time; // Use the provided time
            } else {
              // Get the current time or default to 00:00 if no message
              var currentDate = new Date();
              var hours = currentDate.getHours();
              var minutes = currentDate
                .getMinutes()
                .toString()
                .padStart(2, "0");
              var ampm = hours >= 12 ? "PM" : "AM";
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              message_time.textContent =
                `${hours}:${minutes} ${ampm}` || "00:00"; // Fallback to "00:00"
            }

            // Create the reply link
            var reply_link = document.createElement("a");
            reply_link.setAttribute("class", "reply_link");
            reply_link.textContent = "Reply";
            reply_link.href = "#";
            reply_link.onclick = function () {
              chat_input.value = `${message}:  `; // Add the message to the chat input
              chat_input.focus();
            };

            // Append elements to their respective containers
            message_user_container.append(message_user);
            message_content_container.append(message_content, message_time);
            message_inner_container.append(
              message_user_container,
              message_content_container,
              reply_link
            );
            message_container.append(message_inner_container);

            // Append the message container to the chat content container
            chat_content_container.append(message_container);

            // Play notification sound for other users
            if (
              parent.notificationsEnabled &&
              name !== parent.get_name() &&
              data.name !== parent.get_name()
            ) {
              var audio = new Audio("noti.wav");
              audio.play();
            }
            if (
              parent.notificationsEnabled &&
              name !== parent.get_name() &&
              data.name !== parent.get_name()
            ) {
              var audio = new Audio("noti.wav");
              audio.play();
            }
          });

          // Go to the recent message at the bottom of the container
          chat_content_container.scrollTop =
            chat_content_container.scrollHeight;
        }
      );
    }
  }

  // So we've "built" our app. Let's make it work!!
  var app = new MEME_CHAT();
  // If we have a name stored in localStorage.
  // Then use that name. Otherwise , if not.
  // Go to home.
  if (app.get_name() != null) {
    app.chat();
  }
};
