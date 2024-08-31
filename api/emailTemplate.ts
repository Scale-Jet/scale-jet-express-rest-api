export const emailTemplateFn = (emailBody: any) => `<!DOCTYPE html>
<html
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <!--[if mso]><xml><o:officedocumentsettings><o:pixelsperinch>96</o:pixelsperinch><o:allowpng></o:officedocumentsettings></xml><![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }
      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }
      p {
        line-height: inherit;
      }
      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0;
        overflow: hidden;
      }
      .bg-green {
        background: #00cdac !important;
      }
      .pad.links {
        padding-right: 40px;
      }
      
      table.GeneratedTable {
        width: 100%;
        background-color: #ffffff;
        border-collapse: collapse;
        border-width: 2px;
        border-color: #ffcc00;
        border-style: solid;
        color: #000000;
      }
      
      table.GeneratedTable td, table.GeneratedTable th {
        border-width: 2px;
        border-color: #ffcc00;
        border-style: solid;
        padding: 3px;
      }
      
      table.GeneratedTable thead {
        background-color: #ffcc00;
      }
     
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #fff;
        }
      }
      @media (max-width: 620px) {
        .desktop_hide table.icons-inner {
          display: inline-block !important;
        }
        .white-text {
          color: hsla(200, 0%, 0%, 0.78) !important;
        }
        .our-class {
          font-size: 12px;
        }
        .pad.links {
          padding-right: 0;
        }
        .links {
          min-width: 70px !important;
        }
        .img-block {
          min-width: 100% !important;
          padding: 24px 300px 0 300px !important;
        }
        .links img {
          padding: 0;
          margin: 0;
        }
        .row-content {
          width: 100% !important;
        }
        .logo {
          padding-bottom: 16px !important;
          padding-top: 16px !important;
        }
        p {
          font-size: 18px;
        }
        .column {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }
        .bottom-2 {
          padding-bottom: 20px !important;
        }
        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0;
        }
        .desktop_hide,
        .desktop_hide table {
          max-height: none !important;
        }
        h2 {
          font-size: 18px !important;
        }
        .row-11 .column-11 .block-21.button_block td.pad {
          padding: 16px 0 0 !important;
        }
        .row-11 .column-11 .block-2.button_block a span,
        .row-11 .column-11 .block-2.button_block div span {
          line-height: 1.2 !important;
        }
        .row-11 .column-11 {
          padding: 24px 0 !important;
        }
      }
    </style>
  </head>
  <body
    style="
      background-color: #fff;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
    bgcolor="#FFFFFF"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0;
        mso-table-rspace: 0;
        background-color: #fff;
        background-image: linear-gradient(#fff, #fff);
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              bgcolor="#fff"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="mso-table-lspace: 0; mso-table-rspace: 0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        color: #000;
                        width: 600px;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1 white"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              background-color: #fff;
                              background-image: linear-gradient(#fff, #fff);
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="image_block block-1"
                              role="presentation"
                              style="mso-table-lspace: 0; mso-table-rspace: 0"
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad logo"
                                  style="
                                    padding-bottom: 24px;
                                    padding-top: 24px;
                                    width: 100%;
                                    padding-right: 0;
                                    padding-left: 0;
                                  "
                                >
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <img
                                      src="https://uploads-ssl.webflow.com/6299d639266385b43ef0562f/62dbefa21858fd02bfa51f38_logo-email.png"
                                      style="
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        width: 108px;
                                        max-width: 100%;
                                      "
                                      width="108"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0; mso-table-rspace: 0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        color: #000;
                        width: 600px;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1 bottom-2"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              background-color: #00cdac;
                              padding-left: 40px;
                              padding-right: 40px;
                              vertical-align: top;
                              padding-top: 0;
                              padding-bottom: 40px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              align="center"
                              class="image_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                padding-top: 35px;
                                padding-bottom: 16px;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    width: 100%;
                                    padding-right: 0;
                                    padding-left: 0;
                                  "
                                >
                                  <div
                                    align="center"
                                    class="alignment"
                                    style="line-height: 10px"
                                  >
                                    <img
                                      src="https://uploads-ssl.webflow.com/6299d639266385b43ef0562f/62d2c0d2af5e2e2de4a1818f_CircleWavyCheck.png"
                                      style="
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        width: 48px;
                                        max-width: 100%;
                                      "
                                      width="48"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #fff;
                                      direction: ltr;
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      font-size: 24px;
                                      font-weight: 400;
                                      letter-spacing: 0;
                                      line-height: 120%;
                                      text-align: center;
                                      mso-line-height-alt: 28.799999999999997px;
                                    "
                                  >
                                    ${emailBody}
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-4"
              role="presentation"
              style="mso-table-lspace: 0; mso-table-rspace: 0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        border-bottom: 0 solid #fff;
                        border-left: 0 solid #fff;
                        border-right: 0 solid #fff;
                        border-top: 0 solid #fff;
                        color: #000;
                        width: 600px;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              padding-left: 40px;
                              padding-right: 40px;
                              vertical-align: top;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                            width="75%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="html_block block-2"
                              role="presentation"
                              style="mso-table-lspace: 0; mso-table-rspace: 0"
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="padding-top: 20px; padding-bottom: 5px"
                                >
                                  <div
                                    align="center"
                                    style="
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      text-align: center;
                                    "
                                  >
                                    <div
                                      class="our-class"
                                      style="
                                        display: flex;
                                        justify-content: space-between;
                                        margin-bottom: 8px;
                                      "
                                    >
                                      <div style="color: #686781">
                                        Copyright @ ScaleJet, All rights
                                        reserved
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                            width="25%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="html_block block-2"
                              role="presentation"
                              style="mso-table-lspace: 0; mso-table-rspace: 0"
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad links"
                                  style="
                                    padding-top: 16px;
                                    padding-bottom: 5px;
                                    min-width: 94px;
                                  "
                                >
                                  <div
                                    align="center"
                                    style="
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      text-align: right;
                                    "
                                  >
                                    <a
                                      href="https://www.linkedin.com/company/scale-jet/"
                                      style="text-decoration: none"
                                      ><img
                                        src="https://uploads-ssl.webflow.com/6299d639266385b43ef0562f/6307c1a70daab1cab8ec7210_LinkedIn.png"
                                        style="
                                          margin-right: 16px;
                                          max-width: 24px;
                                        " /></a
                                    ><a
                                      href="https://facebook.com/ScaleJet"
                                      style="text-decoration: none"
                                      ><img
                                        src="https://uploads-ssl.webflow.com/6299d639266385b43ef0562f/6307c1a74601936819a0daeb_Facebook.png"
                                        style="max-width: 24px"
                                    /></a>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-5"
              role="presentation"
              style="mso-table-lspace: 0; mso-table-rspace: 0"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        color: #000;
                        width: 600px;
                      "
                      width="600"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="icons_block block-1"
                              role="presentation"
                              style="mso-table-lspace: 0; mso-table-rspace: 0"
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    vertical-align: middle;
                                    color: #9d9d9d;
                                    font-family: inherit;
                                    font-size: 15px;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                    text-align: center;
                                  "
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0;
                                      mso-table-rspace: 0;
                                    "
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        class="alignment"
                                        style="
                                          vertical-align: middle;
                                          text-align: center;
                                        "
                                      ></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
