const prompts = require("prompts");
const WEBHOOKS = require("@octokit/webhooks-definitions");

module.exports = async (event, actions) => {
  if (!event) {
    ({ event } = await prompts([
      {
        type: "autocomplete",
        name: "event",
        message: "Event Trigger",
        choices: WEBHOOKS.map((w) => ({ title: w.name })),
      },
    ]));
  }

  const webhookEvent = WEBHOOKS.find((w) => w.name == event);
  if (!webhookEvent) {
    throw new Error(`Event [${event}] does not exist`);
  }

  if (actions) {
    actions = actions.split(",").map((a) => a.trim());
  } else {
    const availableActions = [{ title: "All Actions", value: null }].concat(
      webhookEvent.actions.map((a) => ({
        title: a,
        value: a,
      }))
    );

    ({ actions } = await prompts([
      {
        type: "autocompleteMultiselect",
        name: "actions",
        message: "Actions to trigger on",
        choices: availableActions,
      },
    ]));
  }

  actions = actions.filter((a) => a);

  return { event, actions };
};
