const $ = require('jquery');

import swal from 'sweetalert2';
import ajaxErrorFunction from 'errorFunction';

const getSocialButtonsHTML = (text) => `
  <div class="social-buttons">
    <p>
      ${ text }
    </p>
    <div class="social-pages-links">
      <a href="https://www.facebook.com/KasselLabs" target="_blank" rel="noopener noreferrer">
        <svg width="40" height="40" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Facebook icon</title>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <a href="https://instagram.com/KasselLabs" target="_blank" rel="noopener noreferrer">
        <svg width="40" height="40" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Instagram icon</title>
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        </svg>
      </a>
      <a href="https://twitter.com/KasselLabs" target="_blank" rel="noopener noreferrer">
        <svg width="40" height="40" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>Twitter icon</title>
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      </a>
    </div>
  </div>
`.replace(/\n/g, '').replace(/\s+</g, '<');

const donationMinimum = 10;

const calcTime = function(queue){
  let minutes = (queue+1)*50;
  let hours = Math.floor(minutes/60);
  let days = Math.floor(hours/24);
  let time = "";
  if(days > 0){
    time += days + " days";
  }
  if(days < 3){
    hours = hours%24;
    minutes = minutes%60;
    if(hours > 0){
      time += " " +hours + " hours";
    }
    if(minutes > 0){
      time += " " +minutes + " minutes";
    }
  }
  return time;
};

const paymentPageUrl = 'https://payment.kassellabs.io/';

const requestVideo = function(donate,key, email){
  if(email === false) return false;

  var url = "https://upsidedown.kassellabs.io/request?code="+ key +"&email=" + email;
  $.ajax({
    url: url,
    type: 'GET',
    crossDomain: true,
    success: function(data){
      var queue = data.queue;
      swal({
        title: '<h2>Video Request Sent</h2>',
        html:'<p>'+
                'Your video has been queued. Your current position on the queue is <b>'+
                (queue+1) + '</b>, which will take up to <b>'+ calcTime(queue) +'</b>.<br>'+
                'The link to download the video will be sent to the e-mail:<br>'+
                '</p><span class="email">'+email+'</span>'+
                (
                  donate ?
                  (
                   '<p style="margin-top: 15px;">But as you donated, we will bump you up on the queue.'+
                    '  Thank you so much for supporting us! You should receive the confirmation email within a few minutes.'+
                   '</p>'
                  ) :
                  ''
              ) +
              getSocialButtonsHTML('In the meantime, follow us on our social media to get our latest updates!') +
              '<p style="margin-top: 15px;">By using this website you are agreeing to our <a href="https://help.kassellabs.io/strangerthings/" target="_blank">Terms of Service</a>.</p>'
              ,
      }).then(()=>{},()=>{});
    },
    error: ajaxErrorFunction('Error when request video download.'),
  });
};

const defaultDownloadAlert = {
  title: '<h2>Video Download</h2>',
  html: '<p>'+
              'Type your email below and you will receive a message with the URL to download your video when it\'s ready'+
              '</p>',
  input: 'email',
  showCancelButton: true,
  inputPlaceholder: "Your e-mail...",
  showLoaderOnConfirm: true,
};

export const showDonateModalCallback = (openingKey) => () => {

  const donateAlert = {
    ...defaultDownloadAlert,
  };

  donateAlert.title = '<h2>Donate</h2>';
  donateAlert.html =`
    <p>Thanks for your support! Remember, at least $${donationMinimum} Dollars for the rendered video.</p>
    <p>You can pay via Credit Card or via PayPal.</p>
    <iframe
      id="donate-iframe"
      title="Stripe Payment Form"
      src="${paymentPageUrl}?embed=true&app=stranger-things&code=${openingKey}&amount=${donationMinimum*100}"
      allowpaymentrequest="true"
    ></iframe>
    <p>Confirm your email below and you will receive a message with the link to download your video when it's ready</p>
    <p>
      You'll be able to add as many e-mails as you want to
      <b>this video</b>. Just add
      your other emails after the first one, without donating.
      Attention! Make sure there are no typos in your text, you will need to request a new video download and donate again.
      By using this website you are agreeing to our <a href="https://help.kassellabs.io/strangerthings/" target="_blank">Terms of Service</a>.
    </p>
  `;
  swal(donateAlert).then(requestVideo.bind(window, true, openingKey), () => {});
};

export default function downloadVideo(openingKey){
    // check if download is available:
  $.ajax({
    url: "https://upsidedown.kassellabs.io/status?code="+openingKey,
    crossDomain: true,
    success: (data) => {
      var queue = data.queue;

      if (data.status === 'not_queued') {
        queue = data.queueSize;
      }

      // video already rendered
      if(data.url){
        swal({
          title: '<h2>Download</h2>',
          html: '<p>'+
                        'This video has already been generated, click the link below to download.<br><br>'+
                        '<a href="'+data.url+'">'+data.url+'</a></p>',
        }).then(()=>{},()=>{});
        return ;
      }

      swal({
        title: '<h2>Donate and Download</h2>',
        html: '<p>'+
                        'We want to provide videos for free, but we have to use a server to render it, which costs money.<br>'+
                        'There are <b>'+(queue+1)+' videos</b> in front of you and it will take <b>'+calcTime(queue)+'</b> to be processed.<br/><br/>'+
                        'Can\'t wait for it? Donate at least <b>$'+donationMinimum+' Dollars</b>, you will jump the queue and your video will be ready in few hours.<br><br/>'+
                        'The video will be rendered in Full HD quality and MP4 file. To see a sample video click '+
                        '<a href="https://youtu.be/Q0eEXKyA540" target="_blank">here</a>. <br/>'+
                        'Attention! Make sure there are no typos in your text, there will be no correction after the video rendering.<br><br/>'+
                        'By using this website you are agreeing to our <a href="https://help.kassellabs.io/strangerthings/" target="_blank">Terms of Service</a>.'+
                        '</p>',
        showCancelButton: true,
        confirmButtonText: "Yes, donate!",
        cancelButtonText: "No, I'll get in the queue!",
        animation: "slide-from-top",
      }).then(
        showDonateModalCallback(openingKey),
        () => {
          swal(defaultDownloadAlert).then(requestVideo.bind(window, false, openingKey), () => {});
        });
    },
    error: ajaxErrorFunction('Error when request video information to download.'),
  });
}
