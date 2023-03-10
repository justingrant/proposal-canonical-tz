# April 15, 2021

## Attendees:
- Shane F. Carr (SFC)
- Philip Chimento (PFC)
- Cam Tenny (CJT)
- Jason Williams (JWS)
- James Wright (JWT)
- Philipp Dunkel (PDL)
- Ujjwal Sharma (USA)
- Frank Yung-Fong Tang (FYT)
- Justin Grant (JGT)
- Daniel Ehrenberg (DE)
- Richard Gibson (RGN)

## Agenda:
### Question from Google TypeScript team about making polyfill available to internal clients
- JWT: Question around timing, of when a production polyfill will be available.
- PDL: Bloomberg has an interest in getting a production ready polyfill as well, so we should be collaborating as soon as we can. The polyfill as it stands, is not production ready, because we want to make sure typings are right, clean up the code, but it's pretty much there. There are 2 places that specifically need better interoperability and that is getting standard time zones and calendars supported. Right now we’re using `Intl.DateTimeFormat` to figure out time zone information.
- JWT: Next question was around the tech used. It sounds like Bloomberg is planning to use TypeScript, and SFC mentioned using WASM. One of our concerns is that it has to work on IE. I understand if this group doesn't want to take on that support but maybe making those parts pluggable would be a solution.
- JWS: We also have the IE concern.
- PDL: Our idea is to polyfill things separately and do a capability check. Plug the right things in and make it tree-shakable depending on what is available in the environment.
- JWT: Would you be OK with receiving pull requests for these things?
- PDL: We are in the process of migrating it outside the TC39 organization, but other than that, yes.

### Update on MDN relicensing ([#1468](https://github.com/tc39/proposal-temporal/issues/1468))
- CJT: We have almost all we need to relicense the documentation to MDN, but there is one thing to clarify with TC39. Individuals retain the copyright over their contributions, but TC39 retains the copyright and license to the completed work, so I need to ask this. I'm sure there's precedent for contributing to MDN, though.
- PDL: If you have all individual contributions relicensed, doesn't that relicense the completed work?
- CJT: I'm not a lawyer, but I imagine it'll be fine if we just ask. The other thing is that I need to finish my audit of Googlers' contributions to code snippets or cookbook examples, because code in MDN needs to be CC0. I'll give another update on this in two weeks.

### Naming of Temporal.Duration fields ([#325](https://github.com/tc39/proposal-temporal/issues/325))
- SFC presents some slides.
- JGT: (about the slide of plural fields being lists of things) There were other exceptions such as "digits".
- USA: `"fractionalSecondDigits"`
- PDL: I would like to raise a procedural issue, that this is not a new issue and due to the part of the process we are in, could not have come as a surprise to the people raising this issue. Making this change at this point would devalue the stage process of TC39, and is a minor point compared to the integrity of the stage process. There have literally been years in which this could have been brought up.
- JWS: We need to consider whether the benefit of making this change outweighs the meaning of the stage process.
- FYT: According to PDL this is a minor change. What is a minor and a major change?
- DE: We had a long period of time in which we declared the proposal frozen. In October we had a long meeting in which we went over all of the open decisions including this one. We then froze the proposal in order to attract reviews. If we make this change, it will indicate uncertainty to people, thinking that Temporal is still under discussion. This is not a theoretical concern, this happened with private fields and methods, which implementers didn't prioritize.
- FYT: The spec is not frozen, there are normative changes being made.
- PFC: These normative changes are exclusively the ones agreed upon in the "conditional Stage 3" consensus, no others.
- DE: Normative changes can be made in Stage 3 proposals, but they require consensus. You can make changes because you don't like the API in stage 2, but you can't do that in stage 3 without consensus.
- FYT: That's why we're here, to establish consensus on making this change.
- DE: The change needs a consensus in the positive direction. We should remember that objections at this point in the stage process come with the opposite polarity. The fallback option is that nothing changes. To summarize, to make this change, we would need the consensus of everybody.
- FYT: The point of order is resolved, then. Let's continue with the presentation.
- SFC: I understand and agree.
- (presentation continues)
- PDL: (about aliases in property bags) We actually opted for non-compatibility here because we don't want to mix types where you confuse a PlainDateTime property bag with a Duration property bag.
- JGT: I did a quick review while we were chatting earlier and I wasn't able to find a single platform that has singular Duration property names. There is inconsistency between singular and plural around non-Duration types.
- FYT: I found examples in Android of units being used as singular.
- JGT: I'm talking about property names of Duration objects.
- PDL: My opinion independent of the procedural question is that I would be OK to change the values of the `smallestUnit`, etc., options to be singular, but not the Duration property names.
- JGT: I agree with PDL.
- PFC: The option values are currently allowed to be either singular or plural.
- PDL: That reminds me of the original conversation we had about this.
- USA: Relaying chat message from RGN: aliases make code easier to write at the expense of making it harder to read.
- USA: It's true that talking about units in isolation they can be singular but given the precedent of Moment, Luxon, that's what is familiar to programmers who will be using Temporal.
- JGT: date-fns as well.
- JWS: Option 4 would be methods like `from()`?
- JGT: "Method" is a mistake there, it should say "option".
- JWS: I see. I'm not a fan of option 4 because it will increase the knock-on effect on MDN, where people are confused about which to use.
- JGT: We do already have that problem today because there are different option names. So I wouldn't mind standardizing on one variation for unit names. We don't have that same problem with properties.
- JWS: It seems like either way there's some inconsistency with options then.
- FYT: Part of the reason we discovered it at this stage was due to trying to implement `Duration.toLocaleString()`, which requires `format()` and `formatToParts()`. `formatToParts()` outputs the unit. If RelativeTimeFormat outputted plural then this would be consistent, but it already doesn't.
- PDL: I agree, but if I recall `formatToParts()` correctly, it outputs a string for the unit, which can be singular. But that has no bearing on the field names of Duration.
- PFC: I agree, that's what I said in my first comment on this thread.
- JGT: Also agree.
- FYT: USA expressed some concerns with doing that.
- USA: I did, but (???)
- JGT: If I understand, RelativeTimeFormat is already inconsistent with DateTimeFormat?
- FYT: They are different things.
- SFC: RelativeTimeFormat is more of a number formatter.
- USA: Are you talking about the "literal" in the object returned from `formatToParts()`?
- FYT: No, the "unit" identifier. From our point of view that should be consistent.
- JGT: Is there anyone who would object to anywhere a unit name is accepted as a string in 262/402, that the string is accepted as a singular value?
- USA: I was the one who originally had a concern about that, but I consider it better than any of the alternatives.
- (Discussion of a procedural question)
- No one else objects.
- JGT: Is there anyone who objects to anywhere a unit name is output as a string, that the string is output as a singular value?
- PDL: I don't object, but I'm not comfortable making a call for 402 as a Temporal champion.
- FYT: There are additional places than `formatToParts()` where this is relevant. (???)
- DE: These questions would make more sense to me if we framed them in terms of observable changes.
- SFC: In 402, currently everywhere unit names are output as singular, and RelativeTimeFormat accepts both singular and plural on input.
- DE: So the only change that is being proposed is in `DurationFormat.formatToParts()`? Or it already uses singular and that is just the status quo?
- FYT: My concern is that if we do that, then we'll bring DurationFormat for stage 3 and you'll object to the values being singular.
- PDL: I will not object to that and will support you against anyone who does.
- PFC: This was exactly my point at the very beginning of the thread. These are two different things.
- JGT: I agree.
- FYT: USA, do you have any concerns with this?
- USA: No, I am fine with this conclusion.
- USA relaying a comment from RGN: RelativeTimeFormat seems to be bad precedent here.
- JGT: If I can paraphrase, it is bad precedent because it allows aliases? RGN, Is that what you meant?
- RGN: Yes.
- JGT: Do we document the option values as singular?
- No objections.
- JGT: Does `Intl.DurationFormat.format()` take a property bag that allows singular properties?
- PDL: I think it should not, but that's up to 402. The precedent is that other `format()` methods don't accept any structure values at all, anyway.
- JGT: TypeScript question for JWT. Would accepting "minute" and "minutes" as the value of e.g. the smallestUnit option cause problems for TypeScript?
- JWT: I think you can represent it as a union type.
- JWS: You can.
- JWT: There was a bug recently in the compiler where marking one overload as deprecated actually marked all of them, but hopefully that's not relevant here.
- JWS: This comes back to my question about the documentation. The reason I ask is because if we only document the singular, then I go to write code and TypeScript hints that you can also use the plural, that's confusing and seems broken.
- JGT: Are there cases where there's "preferred" syntax and also "accepted but not one that we want people to use"? Is there a way to indicate that in TypeScript or do you just not accept it at all and make people cast?
- JWT: Good question. I'm not sure what applies here.
- JGT: Do we feel that the usability value of accepting plurals for these, outweigh the disadvantage that JWS just brought up?
- JWS: I think it's OK if it's documented.
- SFC: My opinion is that we should pick a canonical form, it's OK if we accept others, and TypeScript doesn't need to know about that. TypeScript can be opinionated.
- DE: I think it would be slightly bad for the adaptation of JS codebases to TypeScript if the typings don't express what you can write in JS.
- JWS: (???)
- JGT: My proposal is that we stop accepting plural values for option values.
- PDL: The reason we did this is for convenience.
- DE: I'm opposed to that as a stage 3 change.
- PFC: I don't agree with removing capabilities that we already have during stage 3.
- JGT: OK, my fallback proposal is to change the documentation then.
- PFC: That's fine with me. We can also consolidate the abstract operations in the spec text as long as it's not observable, only editorial.
- SFC: What do we think about aliases for the property names in the property bags and fields? (For example, `d.hour`, `Temporal.Duration.from({ hour: 5 })`)
- FYT: That wasn't discussed yet.
- JGT: We did discuss it in that it opens up a class of bugs.
- DE: In the evolution from Moment to Luxon they did have singular and plural aliases and removed them in favour of plural.
- SFC: Proposal is that we keep the status quo but make editorial changes favouring singular option values. Do we need to present on this next week?
- FYT: I think it's important to present that we discussed the issue and reached an agreement.
- DE: I think we should only have an agenda item if we are seeking feedback from the committee. We can let people know that we discussed it by attaching the link to the PR in which we remove the agenda item.
- PDL: Agree, it's not a good use of the committee's time.
- JGT: Agree.
- USA: If we did want to talk about it in plenary, a DurationFormat status update might be the appropriate place to do that.
- (Discussion about a procedural issue.)

### IETF update
- USA: We've hit a minor roadblock in IETF. It seems that some people in IETF would prefer if the draft had a token blessing by Ecma. What do you think? Could we initiate a conversation between the GA and IETF? That might take a long time.
- PDL: Could we add an agenda item to the plenary for this and send them the notes?
- USA: Could the minutes of last plenary be sufficient? I haven't sent a response yet.
- PDL: I think so. If that's not sufficient, we can add an agenda item in which it's specifically approved.
