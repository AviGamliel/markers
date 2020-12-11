let pargrpahs = document.getElementsByTagName('p');
let spans = document.getElementsByTagName('span');
let MARKER_DIV_DOAWN = false;
let REGULAR_DIV_DOAWN = false;
let MARKER_DIV_UP = false;
let REGULAR_DIV_UP = false;

if (pargrpahs) {
    for (p of pargrpahs) {

        p.addEventListener('mousedown', function (e) {
            mouse_down(e.target)
        });
        p.addEventListener('mouseup', function (e) {
            mouse_up(e.target)
        });

    }
}
if (spans) {
    for (span of spans) {
        span.addEventListener('mousedown', function (e) {
            mouse_down(e.target)
        });
        span.addEventListener('mouseup', function (e) {
            mouse_up(e.target)
        });
    }
}
function CHECK_DROP_MOUSE_IN(CLASS_LIST) {
    if (CLASS_LIST[0] == 'marked_avi') {
        MARKER_DIV_DOAWN = true;
        REGULAR_DIV_DOAWN = false;
    } else {
        REGULAR_DIV_DOAWN = true;
        MARKER_DIV_DOAWN = false;
    }
}
function CHECK_DROP_MOUSE_OUT(CLASS_LIST) {
    if (CLASS_LIST[0] == 'marked_avi') {
        MARKER_DIV_UP = true;
        REGULAR_DIV_UP = false;
    } else {
        REGULAR_DIV_UP = true;
        MARKER_DIV_UP = false;
    }
}

let FLAGTARGET;
function mouse_down(TARGET) {
    let CLASS_LIST = TARGET.classList;
    CHECK_DROP_MOUSE_IN(CLASS_LIST);
    FLAGTARGET = TARGET;
}

function mouse_up(TARGET) {

    let CLASS_LIST = TARGET.classList;
    CHECK_DROP_MOUSE_OUT(CLASS_LIST);


    if (TARGET) {

        let SELECT_TEXT = window.getSelection().toString();
        let LENGTH = SELECT_TEXT.length;
        let TARGET_TEXT = TARGET.innerText;
        let ALL_TEXT_LENGTH = TARGET_TEXT.length;
        let POS_START = TARGET_TEXT.indexOf(SELECT_TEXT);
        let POS_END = POS_START + LENGTH;
        let PART_A;
        let PART_B;
        let NEW_SENTENCE;

        PART_A = TARGET_TEXT.slice(0, POS_START);
        PART_B = TARGET_TEXT.slice(POS_END, ALL_TEXT_LENGTH - POS_END + POS_END)

        if (REGULAR_DIV_DOAWN && REGULAR_DIV_UP) {
            let FIXED_POS = "0000";
            if (POS_START < 10) {
                FIXED_POS = "000" + POS_START;
            } else if (POS_START >= 10 && POS_START < 100) {
                FIXED_POS = "01" + POS_START;
            } else if (POS_START >= 100 && POS_START < 1000) {
                FIXED_POS = "0" + POS_START;
            }

            let MIDDLE_MARK = `<span id=${FIXED_POS.toString()} class="marked_avi ${FIXED_POS.toString()}" style="background:yellow;">${SELECT_TEXT}</span>`;
            NEW_SENTENCE = `${PART_A}${MIDDLE_MARK}${PART_B}`;
            TARGET.innerHTML = NEW_SENTENCE;

        } else if (MARKER_DIV_DOAWN && REGULAR_DIV_UP) {

            let MARKER_TEXT = FLAGTARGET.innerText;
            let TARGET_HTML = FLAGTARGET.parentElement.innerHTML;
            let TARGET_TEXT = FLAGTARGET.parentElement.innerText;
            let POS_START = TARGET_TEXT.indexOf(SELECT_TEXT);
            let POS_END = POS_START + LENGTH;

            const MARKER_TEXT_LENGTH = MARKER_TEXT.length;
            const PREVIEW_START = TARGET_TEXT.indexOf(MARKER_TEXT);
            const PREVIEW_END = PREVIEW_START + MARKER_TEXT_LENGTH;

            if (PREVIEW_END < POS_END) {

                let START_SPAN = SLICE(TARGET_HTML, PREVIEW_END + 61, 61 + PREVIEW_END + 7);
                let HTML_TEMPLATE = REPLACE(TARGET_HTML, START_SPAN, '');
                let NEW_HTML_TEMPLATE = SLICE(HTML_TEMPLATE, 0, POS_END + 61);
                let NEW_HTML_PAER_B = SLICE(HTML_TEMPLATE, POS_END + 61, HTML_TEMPLATE.length);
                let FINAL = `${NEW_HTML_TEMPLATE}${START_SPAN}${NEW_HTML_PAER_B}`;
                TARGET.innerHTML = FINAL;
            }
            if (PREVIEW_START > POS_START) {

                let START_SPAN = SLICE(TARGET_HTML, PREVIEW_START, 61 + PREVIEW_START);
                let HTML_TEMPLATE = REPLACE(TARGET_HTML, START_SPAN, '');
                let NEW_HTML_TEMPLATE = SLICE(HTML_TEMPLATE, 0, POS_START);
                let NEW_HTML_PAER_B = SLICE(HTML_TEMPLATE, POS_START, HTML_TEMPLATE.length);
                let FINAL = `${NEW_HTML_TEMPLATE}${START_SPAN}${NEW_HTML_PAER_B}`;
                TARGET.innerHTML = FINAL;

            }

        } else if (REGULAR_DIV_DOAWN && MARKER_DIV_UP) {

            let MARKER_TEXT = TARGET.innerText;
            let TARGET_HTML = TARGET.parentElement.innerHTML;
            let TARGET_TEXT = TARGET.parentElement.innerText;
            let POS_START_TEXT = TARGET_TEXT.indexOf(SELECT_TEXT);
            let POS_END_TEXT = POS_START_TEXT + SELECT_TEXT.length;

            const PREVIEW_START = TARGET_TEXT.indexOf(MARKER_TEXT);
            const MARKER_TEXT_LENGTH = MARKER_TEXT.length;
            const PREVIEW_END = PREVIEW_START + MARKER_TEXT_LENGTH;

            if (POS_START_TEXT < PREVIEW_START) {

                let START_SPAN = SLICE(TARGET_HTML, PREVIEW_START, 61 + PREVIEW_START);
                let HTML_TEMPLATE = REPLACE(TARGET_HTML, START_SPAN, '');
                let NEW_HTML_TEMPLATE = SLICE(HTML_TEMPLATE, 0, POS_START_TEXT);
                let NEW_HTML_PAER_B = SLICE(HTML_TEMPLATE, POS_START_TEXT, HTML_TEMPLATE.length);
                let FINAL = `${NEW_HTML_TEMPLATE}${START_SPAN}${NEW_HTML_PAER_B}`;
                TARGET.parentElement.innerHTML = FINAL;

            }

            if (PREVIEW_END < POS_END_TEXT) {

                let START_SPAN = SLICE(TARGET_HTML, PREVIEW_END + 61, 61 + PREVIEW_END + 7);
                let HTML_TEMPLATE = REPLACE(TARGET_HTML, START_SPAN, '');
                let NEW_HTML_TEMPLATE = SLICE(HTML_TEMPLATE, 0, POS_END_TEXT + 61);
                let NEW_HTML_PAER_B = SLICE(HTML_TEMPLATE, POS_END_TEXT + 61, HTML_TEMPLATE.length);
                let FINAL = `${NEW_HTML_TEMPLATE}${START_SPAN}${NEW_HTML_PAER_B}`;
                TARGET.parentElement.innerHTML = FINAL;

            }
        }
    }
}


function SLICE(parent, start, end) {
    return parent.slice(start, end);
}

function REPLACE(parent, target, newItem) {
    return parent.replace(target, newItem);
}


