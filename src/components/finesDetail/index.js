import React from 'react';
import PropTypes from 'prop-types';
import { Group, List, Cell, InfoRow } from '@vkontakte/vkui';
import ReactMarkdown from 'react-markdown';


const FinesDetail = ({ item }) => {

    const getArticleList = () => {
        return item.offenseArticles.map(item => 
            <Group 
                title={item.articleNumber} 
                key={item.articleNumber}
            >
                <List>
                    <Cell multiline>
                        <InfoRow title="Правонарушение">
                            {item.articleText}
                        </InfoRow>
                    </Cell>

                    <Cell multiline>
                        <InfoRow title="Санкции и меры обеспечения производства">
                            <ReactMarkdown 
                                source={item.articleSanctions} 
                                escapeHtml={false} 
                                disallowedTypes={[
                                    'link',
                                    'image',
                                    'linkReference',
                                    'imageReference',
                                ]} 
                            />
                        </InfoRow>
                    </Cell>
                </List>
            </Group>
        )
    }

    const articleList = getArticleList();

    return articleList;
};

FinesDetail.propTypes = {
    item: PropTypes.object.isRequired,
};

export default FinesDetail;
