import swal from 'sweetalert2';
import { showDonateModalCallback } from './downloadVideo';

document.querySelector('#donateFooterButton').addEventListener('click', (e) => {
  e.preventDefault();
  var urlParams = location.hash.replace('#!/', '').split('/');
  var openingKey = urlParams[0];

  if (!openingKey) {
    swal({
      title: 'Donate',
      html: `<p>You can donate to support us and receive your creation rendered as a video.</p>
      <p>But first, you need to create your own content, edit the fields, and click on the PLAY button to make it.</p>
      <p>Then you can request your Download or click on this button to donate for it.</p>`,
    });
    return;
  }

  showDonateModalCallback(openingKey)();
});
