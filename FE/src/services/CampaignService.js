const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// TODO: Add token authentication
export const createCampaign = async (token, campaignData) => {
    console.log('Creating campaign with data:', campaignData);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(campaignData),
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/campaigns`, requestOptions);
    if (!response.ok) {
        return { status: response.status, message: 'Network response was not ok' };
    }
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
}

// TODO: Add token authentication
export const getCampaignsByUser = async (token, userId) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/campaigns/user/${userId}`, requestOptions);
    if (!response.ok) {
        return { status: response.status, message: 'Network response was not ok' };
    }
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
};

// TODO: Add token authentication
export const getCampaignById = async (token, campaignId) => {
    console.log('Fetching campaign with ID:', campaignId);
    if (!campaignId) {
        return { status: 400, message: 'Campaign ID is not set' };
    }
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
        },
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/campaigns/campaign/${campaignId}`, requestOptions);
    console.log('Response:', response);
    if (!response.ok) {
        return { status: response.status, message: 'Network response was not ok' };
    }
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
};

export const getCampaignByLink = async (linkUuid) => {
    console.log('Fetching campaign with link:', linkUuid);
    if (!linkUuid) {
        return { status: 400, message: 'Link is not set' };
    }
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`, 
        },
    };
    const response = await fetch(`${BACKEND_URL}/api/v1/campaigns/link/${linkUuid}`, requestOptions);
    if (!response.ok) {
        return { status: response.status, message: 'Network response was not ok' };
    }
    const data = await response.json();
    console.log('Campaign data:', data);
    return {
        status: response.status,
        data: data,
    };
}

export const saveCampaignFeedback = async (campaignId, linkUuid, responseContents) => {
    console.log('Saving campaign feedback:', { campaignId, linkUuid, responseContents });
    if (!campaignId || !linkUuid || !responseContents) {
        return { status: 400, message: 'Campaign ID, team member link, and response contents are required' };
    }
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ campaignId, linkUuid, responseContents }),
    };

    console.log('Request options:', requestOptions);
    const response = await fetch(`${BACKEND_URL}/api/v1/campaigns/save-feedback/`, requestOptions);
    if (!response.ok) {
        return { status: response.status, message: 'Network response was not ok' };
    }
    const data = await response.json();
    return {
        status: response.status,
        data: data,
    };
}