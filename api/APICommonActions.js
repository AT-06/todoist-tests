class APICommonActions {

    static getProjectId(data, projectName) {
        let id;
        Object.entries(data).forEach(([key, value]) => {
            if (value.name == projectName) {
                id = value.id;
            }
        });
        return id;
    }
}

module.exports = APICommonActions;