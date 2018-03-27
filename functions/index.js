// #TESTS webhook 'https://hooks.slack.com/services/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'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const request = require('request')
admin.initializeApp(functions.config().firebase)
const db = admin.database()

exports.notifyNewSignup = functions.auth.user().onCreate(event => {
    const user = event.data
    const email = user.email
    return request.post(
        'https://hooks.slack.com/services/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',
        { json: { text: `New signup from ${email} !!` } }
    )
})

exports.hustle = functions.https.onRequest((req, res) => {
    res.status(200).send(req.body.text)
    // console.log(req.body)
    return request.post(
        // 'https://hooks.slack.com/services/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', // test webhook
         'https://hooks.slack.com/services/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', // game webhook
        {
            json: {
                attachments: [
                    {
                        initiator: req.body.user_name,
                        fallback: req.body.user_name + ' proposes a hustle.',
                        pretext: 'FRESH',
                        title: req.body.text,
                        text:
                            req.body.command +
                            ' from <@' +
                            req.body.user_id +
                            '|' +
                            req.body.user_name +
                            '>',
                        color: '#000000',
                        callback_id: 'confirmation',
                        thumb_url:
                            'https://files.slack.com/files-pri/T4AQ56P4J-F968JLCAW/sxan-blox-logo-512-hustle.png',
                        actions: [
                            {
                                name: 'accept',
                                type: 'button',
                                text: '👍 Accept',
                                value: 'accept'
                            },
                            {
                                name: 'accept',
                                type: 'button',
                                text: '🖕 Reject',
                                confirm: {
                                    title: 'Confirm rejection',
                                    text:
                                        'Please reconsider. Rejecting hustles is weak af.',
                                    ok_text: 'Reject',
                                    dismiss_text: 'Reconsider'
                                },
                                value: 'reject'
                            }
                        ]
                    }
                ]
            }
        }
    )
})
exports.hustles = functions.https.onRequest((req, res) => {
    res.status(200).send('One sec..')
    // console.log(req.body)

    return request.post(req.body.response_url, {
        json: {
            attachments: [
                {
                    fallback: req.body.user_name + ' proposes a hustle.',
                    pretext: 'FRESH',
                    title: req.body.text,
                    text: JSON.stringify({ example: 'of a test' }),
                    color: '#000000',
                    callback_id: 'hustle_choices',
                    thumb_url:
                        'http://ace.mu.nu/archives/spade%20and%20skull%20Banner2.jpg',
                    actions: [
                        {
                            name: 'choices',
                            type: 'button',
                            text: '📜 List the hustles',
                            value: 'list'
                        },
                        {
                            name: 'choices',
                            type: 'button',
                            text: '🔍 Find a hustle',
                            value: 'find'
                        },
                        {
                            name: 'choices',
                            type: 'button',
                            text: '🎙 Announce a hustle',
                            confirm: {
                                title: 'This will be public.',
                                text: 'Ready to publish?',
                                ok_text: 'Publish',
                                dismiss_text: 'Cancel'
                            },
                            value: 'announce'
                        }
                    ]
                }
            ]
        }
    })
})

exports.sxoin = functions.https.onRequest((req, res) => {
    res.status(200).send(req.body.text)
    return request.post(
        'https://hooks.slack.com/services/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',
        { json: { text: req.body.text } }
    )
})

exports.actions = functions.https.onRequest((req, res) => {
    res.status(200).send('OK. One moment, please...')
    console.log(req.body)
    var actions = []
    if (JSON.parse(req.body.payload).actions[0].value == 'accept') {
        actions.push({
            name: 'complete',
            type: 'button',
            text: '✅  Complete',
            value: 'completed'
        })
        actions.push({
            name: 'surrender',
            type: 'button',
            text: '⛔  Surrender',
            confirm: {
                title: 'Confirm rejection',
                text: 'Please reconsider. Rejecting hustles is weak af.',
                ok_text: 'Surrender',
                dismiss_text: 'Reconsider'
            },
            value: 'surrender',
            style: 'danger'
        })
    } else if (
        JSON.parse(req.body.payload).actions[0].value == 'validated' ||
        JSON.parse(req.body.payload).actions[0].value == 'surrender' ||
        JSON.parse(req.body.payload).actions[0].value == 'reject'
    ) {
        actions.push({
            name: 'accept',
            type: 'button',
            text: '🐣 Revive',
            confirm: {
                title: 'Request revival of this hustle.',
                text: 'If request is granted, you\'ll be notified',
                ok_text: 'Request Revival',
                dismiss_text: 'Cancel'
            },
            value: 'accept'
        })
    } else if (JSON.parse(req.body.payload).actions[0].value == 'completed') {
        actions.push({
            name: 'Completed',
            type: 'button',
            text: '🔓  VALIDATE',
            confirm: {
                title: 'Validate this hustle.',
                text:
                    'In accordance with SXAN\'s Standard of Ethics, please validate this transaction',
                ok_text: '🔓 VALIDATE',
                dismiss_text: 'Cancel'
            },
            value: 'validated'
        })
    } else if (JSON.parse(req.body.payload).actions[0].value == 'surrender') {
        actions.push({
            name: 'Validate',
            type: 'button',
            text: '🔓  VALIDATE',
            confirm: {
                title: 'Validate this hustle.',
                text:
                    'In accordance with SXAN\'s Standard of Ethics, please validate this transaction',
                ok_text: '🔓 VALIDATE',
                dismiss_text: 'Cancel'
            },
            value: 'blocked'
        })
    } else if (JSON.parse(req.body.payload).actions[0].value == 'list') {
        console.log('Your list is coming')
    } else if (JSON.parse(req.body.payload).actions[0].value == 'find') {
        console.log('Your query is coming')
    } else if (JSON.parse(req.body.payload).actions[0].value == 'announce') {
        console.log('Your announcement is coming')
    }
    // console.log('accept ', JSON.parse(req.body.payload, null, 2))
    var timeStampStr =
        '<!date^' +
        Math.round(JSON.parse(req.body.payload).action_ts) +
        '^{date_pretty} at {time}|Date not available> '
    return JSON.parse(req.body.payload).actions[0].name == 'choices'
        ? request.post(JSON.parse(req.body.payload).response_url, {
            json: {
                text: 'nice choice!',
                attachments: [
                    {
                        text: 'Wise decision',
                        title: JSON.parse(req.body.payload).actions[0].value
                    }
                ]
            }
        })
        : request.post(JSON.parse(req.body.payload).response_url, {
            json: {
                attachments: [
                    {
                        fallback: 'Proposes a hustle.',
                        pretext:
                              // JSON.stringify(
                              //     JSON.parse(req.body.payload).original_message
                              //         .attachments[0].pretext
                              // ) +
                              ' *' +
                              JSON.parse(
                                  req.body.payload
                              ).actions[0].value.toUpperCase() +
                              '* ',
                        title: JSON.parse(req.body.payload).original_message
                            .attachments[0].title,
                        text:
                              timeStampStr +
                              ' | *' +
                              JSON.parse(req.body.payload).actions[0].value +
                              '* by <@' +
                              JSON.parse(req.body.payload).user.id +
                              '|' +
                              JSON.parse(req.body.payload).user.name +
                              '>\n' +
                              JSON.parse(req.body.payload).original_message
                                  .attachments[0].text,
                        color: '#22d99b',
                        callback_id: 'follow_up',
                        thumb_url:
                              'https://files.slack.com/files-pri/T4AQ56P4J-F968JLCAW/sxan-blox-logo-512-hustle.png',
                        actions: actions
                    }
                ]
            }
        })
})

exports.events = functions.https.onRequest((req, res) => {
    res.status(200).send(req.body.challenge)
    console.log('\nevent: \n', req.body)
    let newHustle =
        req.body.event &&
        req.body.event.attachments &&
        req.body.event.attachments[0].pretext == 'FRESH' &&
        req.body.event.attachments[0].text.indexOf('/hustle from') == 0

    let updateHustle =
        req.body.event &&
        req.body.event.message &&
        req.body.event.message.attachments &&
        req.body.event.message.attachments[0].pretext &&
        (req.body.event.message.attachments[0].pretext.indexOf('*SURRENDER*') >
            -1 ||
            req.body.event.message.attachments[0].pretext.indexOf('*ACCEPT*') >
                -1 ||
            req.body.event.message.attachments[0].pretext.indexOf(
                '*COMPLETED*'
            ) > -1 ||
            req.body.event.message.attachments[0].pretext.indexOf(
                '*REJECTED*'
            ) > -1 ||
            req.body.event.message.attachments[0].pretext.indexOf(
                '*VALIDATED*'
            ) > -1)
    if (newHustle) {
        console.log('\n\nNEW HUSTLE\n\n')
        let newHustleEvent = {
            type: 'new_hustle',
            user: req.body.authed_users[0],
            status: 'fresh',
            text: req.body.event.attachments[0].title,
            ts: req.body.event.ts
        }
        console.log('\n\n' + JSON.stringify(newHustleEvent, null, 2) + '\n\n')

        db.ref('events').push(newHustleEvent)
        db
            .ref('slack_hustles/' + req.body.event.ts.replace('.', '_'))
            .set(newHustleEvent)
    }
    // console.log(req.body.event.previous_message.attachments[0], '\n')
    // console.log(req.body.event.message.attachments[0], '\n')
    if (updateHustle) {
        var regex = /@\s*(.*?)\s*\|/g
        console.log(
            '\n\nUPDATE HUSTLE\n\n',
            regex.exec(req.body.event.message.attachments[0].text)
        )

        let updateHustleEvent = {
            type: 'update_hustle',
            player: regex.exec(req.body.event.message.attachments[0].text)[1],
            hustleTs: req.body.event.message.ts,
            ts: req.body.event.event_ts,
            status: req.body.event.message.attachments[0].pretext
                .replace(/[^a-zA-Z0-9]/g, '')
                .toLowerCase()
        }
        console.log(
            '\n\n' + JSON.stringify(updateHustleEvent, null, 2) + '\n\n'
        )

        db
            .ref('events')
            .push(updateHustleEvent)
            .then(ref => {
                db
                    .ref(
                        'slack_hustles/' +
                            updateHustleEvent.hustleTs.replace('.', '_') +
                            '/status'
                    )
                    .set(updateHustleEvent.status)
                db
                    .ref(
                        'slack_hustles/' +
                            updateHustleEvent.hustleTs.replace('.', '_') +
                            '/history/' +
                            ref.key
                    )
                    .set(true)
            })
    }
    // .then(() => {
    //     return request.post(req.body.response_url, {
    //         json: { text: req.body.text, callback_id: 'confirmation' }
    //     })
    // })
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
